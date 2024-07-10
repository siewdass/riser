RUN APP

pm2 start yarn --name app -- serve
pm2 start yarn --name api -- serve