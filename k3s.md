1. https://fedoramagazine.org/vagrant-qemukvm-fedora-devops-sysadmin/ - install vagrant, libvirt
2. https://rancher.com/docs/k3s/latest/en/quick-start/ - k3s
    - registries.yaml
```yaml
mirrors:
  springdev.ddns.net:
    endpoint:
      - "https://springdev.ddns.net:5000"
configs:
  "springdev.ddns.net:5000":
    auth:
      username: reader
      password: simple
    tls:
      ca_file: /etc/docker/certs.d/springdev.ddns.net:5000/ca.crt
```

3. [dev@springdev debian]$ cat Vagrantfile 
```
Vagrant.configure("2") do |config|
  config.vm.box = "debian/buster64"
  config.vm.provider :libvirt do |domain|
    domain.memory = 2048
    domain.cpus = 2
    domain.nested = true
    domain.volume_cache = 'none'
  end
end
```

4. port forwarding - https://docs.fedoraproject.org/en-US/Fedora/19/html/Security_Guide/sec-Configure_Port_Forwarding-CLI.html
```bash
[root@springdev ~]# firewall-cmd --zone=external --add-forward-port=port=6443:proto=tcp:toaddr=192.168.122.235 --permanent
success
[root@springdev ~]# firewall-cmd --zone=external --add-forward-port=port=443:proto=tcp:toaddr=192.168.122.235 --permanent
success
[root@springdev ~]# firewall-cmd --zone=external --add-forward-port=port=80:proto=tcp:toaddr=192.168.122.235 --permanent
[root@springdev ~]# firewall-cmd --permanent --zone=external --add-interface=wlp2s0
success
[root@springdev ~]# firewall-cmd --zone=trusted --add-source=192.168.122.235/24
success
```



kubectl run -i --tty --rm bash --image=bash --restart=Never -- bash

5. systemd-resolved 
```bash
sudo vi /etc/systemd/resolved.conf
sudo service systemd-resolved restart
```


5. vagrant resize disk https://www.rodolfocarvalho.net/blog/resize-disk-vagrant-libvirt/