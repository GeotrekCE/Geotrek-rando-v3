# SSH to the preproduction machine

You first need someone who has access to the pprod machine to add your ssh public key to the ~/.ssh/authorized_keys file of the remote machine.

Then you can edit the ~/.ssh/config file of your machine and add the following:

```
Host geotrek-pprod
  HostName 194.182.170.1
  User ubuntu
  IdentityFile ~/.ssh/id_rsa
```

You will then be able to connect to the pprod environment by typing

```bash
ssh geotrek-pprod
```
