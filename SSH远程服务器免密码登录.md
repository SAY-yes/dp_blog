### 在本地的客户端SSH到远程服务端时，每次都要输入用户名和密码，如果不想每次都输入密码则可以使用以下操作。
#### 1.首先在本地的客户端输入 ssh-keygen，生成公私钥
* 如果已存在rsa,展示如下，跳到第二步
```
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/dp/.ssh/id_rsa):
/c/Users/dp/.ssh/id_rsa already exists.
Overwrite (y/n)?
```
* 如果不存在，生成rsa
```
$ ssh-keygen 
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/dp/.ssh/id_rsa): 
Created directory '/c/Users/dp/.ssh'.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /c/Users/dp/.ssh/id_rsa.
Your public key has been saved in /c/Users/dp/.ssh/id_rsa.pub.
The key fingerprint is:
af:a4:d5:4d:96:3c:24:71:ea:37:47:0c:51:3b:ba:2b keysystem@localhost.localdomain
The key's randomart image is:
+--[ RSA 2048]----+
|          . +o.  |
|           + o . |
|          o . =  |
|         . + + . |
|        S . X .  |
|         o = =   |
|        o o o    |
|       + .E  .   |
|      . .  ..    |
+-----------------+
[keysystem@localhost ~]$ 
```
#### 2.执行 cd ~/.ssh/
#### 3.执行 ll -rlt
```
total 10
-rw-r--r-- 1 dp 1049089 1831  7月 15  2020 id_rsa
-rw-r--r-- 1 dp 1049089  408  7月 15  2020 id_rsa.pub
-rw-r--r-- 1 dp 1049089  189  8月 20 14:29 config
-rw-r--r-- 1 dp 1049089 2134  8月 20 14:38 known_hosts
```
#### 4.执行 ssh-copy-id ubuntu@132.232.255.214，其中ubuntu为远程主机的用户名，132.232.255.214为远程服务器的IP地址。

