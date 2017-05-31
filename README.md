# Nginx配置
请以实际config为准
```
upstream broker {
  server 127.0.0.1:9001;
}

server {
    listen       9000;
    server_name  broker.com;

    location / {
        proxy_pass http://broker;
    }
}

upstream serve {
  server 127.0.0.1:3001;
}

server {
	listen 3000;
	server_name server.com;

    location / {
        proxy_pass http://serve;
    }
}
# websocket负载均衡
upstream io_nodes {
	#ip_hash;
	hash $request_uri;
	server 127.0.0.1:8001;
	server 127.0.0.1:8002;
	server 127.0.0.1:8003;
	server 127.0.0.1:8004;
}

server {
	listen 8088;
	server_name server.com;

	location / {
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $host;
		proxy_http_version 1.1;
		proxy_pass http://io_nodes;
	}
}
```
