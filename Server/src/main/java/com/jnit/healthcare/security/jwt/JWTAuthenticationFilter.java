package com.jnit.healthcare.security.jwt;

import com.jnit.healthcare.security.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    Logger logger = LoggerFactory.getLogger(JWTAuthenticationFilter.class);
    private final JWTTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authCode = request.getHeader("Authorization");
        logger.info("authCode info {}", authCode);
        String token = null;
        String userName = null;
        if(authCode != null && authCode.startsWith("Bearer ")) {
            token = authCode.substring(7);
            jwtTokenProvider.setToken(token);
            userName = jwtTokenProvider.getUserNameFromToken(token);
            logger.info("username info {}", userName);
        }

        if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(userName);
            logger.info("userDetails info {}", userDetails);
            if(jwtTokenProvider.validateToken(token, userDetails)) {
                logger.info("validated token");
                logger.info("Authority info {}", userDetails.getAuthorities());
                var authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }

}
