package com.example.be.controller.auth;

import com.example.be.dto.auth.AuthResponse;
import com.example.be.dto.user.LoginRequestUser;
import com.example.be.dto.user.UserResponseNoPassDTO;
import com.example.be.service.auth.AuthService;
import com.example.be.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import java.time.Duration;

@RestController()
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @Value("${auth.refresh-cookie.name:refresh_token}")
    private String refreshCookieName;
    @Value("${auth.refresh-cookie.max-age-seconds:1209600}") // 14 days
    private long refreshCookieMaxAgeSeconds;
    @Value("${auth.cookie.secure:false}")
    private boolean cookieSecure;
    @Value("${auth.cookie.same-site:None}")
    private String cookieSameSite;
    @Value("${auth.cookie.path:/}")
    private String cookiePath;
    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody LoginRequestUser request, HttpServletResponse httpResponse) {
        AuthResponse data = authService.login(request);
        if (data.getRefreshToken() != null) {
            ResponseCookie cookie = ResponseCookie.from(refreshCookieName, data.getRefreshToken())
                    .httpOnly(true)
                    .secure(cookieSecure)
                    .sameSite(cookieSameSite)
                    .path(cookiePath)
                    .maxAge(Duration.ofSeconds(refreshCookieMaxAgeSeconds))
                    .build();
            httpResponse.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            data.setRefreshToken(null);
        }
        return ResponseHandler.ok(data, "Login successfully");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        String refreshToken = null;
        if (httpRequest.getCookies() != null) {
            for (var c : httpRequest.getCookies()) {
                if (refreshCookieName.equals(c.getName())) {
                    refreshToken = c.getValue();
                    break;
                }
            }
        }
        AuthResponse data = authService.refresh(refreshToken);
        // Set refresh token mới vào cookie, không trả trong body
        if (data.getRefreshToken() != null) {
            ResponseCookie cookie = ResponseCookie.from(refreshCookieName, data.getRefreshToken())
                    .httpOnly(true)
                    .secure(cookieSecure)
                    .sameSite(cookieSameSite)
                    .path(cookiePath)
                    .maxAge(Duration.ofSeconds(refreshCookieMaxAgeSeconds))
                    .build();
            httpResponse.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            data.setRefreshToken(null);
        }
        return ResponseHandler.ok(data, "Refresh token successfully");
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        UserResponseNoPassDTO User = authService.me();
        return ResponseHandler.ok(User, "Get current user successfully");
    }
}
