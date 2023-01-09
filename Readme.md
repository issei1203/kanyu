

コンテナのイメージ作成方法
```
docker build -t kanyu:1 .
docker run -p 127.0.0.1:80:8080 --name kanyu -it kanyu:1
```