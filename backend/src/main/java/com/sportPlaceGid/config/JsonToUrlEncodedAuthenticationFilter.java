package com.sportPlaceGid.config;

import org.apache.catalina.connector.RequestFacade;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.core.annotation.Order;
import org.springframework.security.web.savedrequest.Enumerator;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component
@Order(value = Integer.MIN_VALUE)
public class JsonToUrlEncodedAuthenticationFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {
        HttpServletRequest requestServlet = (HttpServletRequest) request;
        HttpServletResponse responseHeader = (HttpServletResponse) response;
        responseHeader.setHeader("Access-Control-Allow-Origin", "*");
        responseHeader.setHeader("Access-Control-Allow-Credentials", "true");
        responseHeader.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        responseHeader.setHeader("Access-Control-Max-Age", "3600");
        responseHeader.setHeader("Access-Control-Allow-Headers", "*");
        if ("OPTIONS".equalsIgnoreCase(requestServlet.getMethod())) {
            responseHeader.setStatus(HttpServletResponse.SC_OK);
        } else {
            if (Objects.equals(request.getContentType(), "application/json") && Objects.equals(((RequestFacade) request).getServletPath(), "/oauth/token")) {
                InputStream is = request.getInputStream();
                ByteArrayOutputStream buffer = new ByteArrayOutputStream();

                int nRead;
                byte[] data = new byte[16384];

                while ((nRead = is.read(data, 0, data.length)) != -1) {
                    buffer.write(data, 0, nRead);
                }
                buffer.flush();
                byte[] json = buffer.toByteArray();

                HashMap<String, String> result = new ObjectMapper().readValue(json, HashMap.class);
                HashMap<String, String[]> r = new HashMap<>();
                for (String key : result.keySet()) {
                    String[] val = new String[1];
                    val[0] = result.get(key);
                    r.put(key, val);
                }

                String[] val = new String[1];
                val[0] = ((RequestFacade) request).getMethod();
                r.put("_method", val);

                HttpServletRequest s = new RequestWrapper(((HttpServletRequest) request), r);
                chain.doFilter(s, response);
            } else {
                chain.doFilter(request, response);
            }
        }


    }

    @Override
    public void destroy() {
    }

    private class RequestWrapper extends HttpServletRequestWrapper {

        private final Map<String, String[]> params;

        RequestWrapper(HttpServletRequest request, Map<String, String[]> params) {
            super(request);
            this.params = params;
        }

        @Override
        public String getParameter(String name) {
            if (this.params.containsKey(name)) {
                return this.params.get(name)[0];
            }
            return "";
        }

        @Override
        public Map<String, String[]> getParameterMap() {
            return this.params;
        }

        @Override
        public Enumeration<String> getParameterNames() {
            return new Enumerator<String>(params.keySet());
        }

        @Override
        public String[] getParameterValues(String name) {
            return params.get(name);
        }
    }
}
