package com.jnit.healthcare.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JWTTokenProvider {

    Logger logger = LoggerFactory.getLogger(JWTTokenProvider.class);
    private static String JWT_SECRET;
    private static Integer JWT_EXPIRATION_TIME;

    private String token;

    @Value("${spring.jwt.secret}")
    public void setJwtSecret(String secret) {
        JWT_SECRET = secret;
        logger.info("JWT_SECRET info {}" + JWT_SECRET);
    }

    @Value("${spring.jwt.expirationTime}")
    public void setJwtExpirationTime(Integer expirationTime) {
        JWT_EXPIRATION_TIME = expirationTime;
        logger.info("JWT_EXPIRATION_TIME info {}" + JWT_EXPIRATION_TIME);
    }

    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return generateTokenForUser(claims, userName);
    }

    public String generateTokenForUser(Map<String, Object> claims, String userName) {

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+JWT_EXPIRATION_TIME))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSignKey() {
        byte[] key = Decoders.BASE64.decode(JWT_SECRET);
        return Keys.hmacShaKeyFor(key);
    }

    public String getUserNameFromToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date getExpirationTimeFromToken(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> resolver) {
        final Claims claims = extractAllClaims(token);
        logger.info("Claims info {}" + claims);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = getUserNameFromToken(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return getExpirationTimeFromToken(token).before(new Date());
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

}
