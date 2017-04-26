# Nginx配置
```
upstream broker {
	    server 127.0.0.1:9000;
    }

    server {
        listen       9000;
        server_name  broker.com;

        location / {
            proxy_pass http://broker;
        }
    }

    upstream serve {
	    server 127.0.0.1:3000;
    }

    server {
		listen 3000;
		server_name server.com;

        location / {
            proxy_pass http://serve;
        }
	}

	upstream io_nodes {
		ip_hash;
		server 127.0.0.1:8000;
	}

    server {
		listen 8000;
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