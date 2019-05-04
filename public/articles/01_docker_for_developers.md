# Docker for developers

My opinion is that containerization in common and docker particularly is the best thing that happened in IT 
industry in last decade. It has simplified building deliverables and deploying applications significantly. 
And it is of course technology that made life easier for system engineers and devops guys.
But the question of today's topic is: Do developers(java, .net, js) need docker?


## Contents

1. Why

    - [Local Environements](#local-environment)
    - [Testing purposes](#testing-purposes)
    - [Prod with kubernetes](#prod-with-kubernetes)

2. What

    - Little bit of a history of docker(#little-bit-of a history of docker)
    - Differences with virtual-machines
    - Architecture overview

3. How

    - Options of installation
    - Useful tools
    - Next level: kubernetes
    - alternatives


## Local environment

This part is based on experience from a real project. 
When we got this project we had to spend something about a week to setup local environment and start actually doing business. 
One had to setup database that was stored inside vm, correctly setup proxies to private artifactory and so on. 
And every new member had to setup the project same way. After we dockerized our local environment all you need to start doing business tasks is just `docker-compose up`.
So the gain was from two plus days to one or so hour to get things going.

## Testing purposes

I hope all of you heard about testcontainers project. If not I strongly recommend to do so. (TODO: Example)
Are you still building your project with jenkins? There is drone ci. And it heavily relies on containers. For integration tests you can start your database for period of job running and everithing will be done within containers.

## Prod with Kubernetes

And of course you can use containerization in production with kubernetes. There's a lot of info online about this topic but for developers i think it will be enough to understand basic concepts and know how to describe the service you develop. So just google "kubernetes 101"

## Little bit of a history of docker 

First of all what is the idea behind containerization? It is quite simple: run process in isolated environment and allow to share core API of the system.
So there was a long ago jails on bsd they allowed to run process isolated from whole system. But it was not called containers. And it was delivered in early 2000's
In 2007 control groups on linux were introduced. Essentialy cgroups is a mechanism that allows for the process (or process group) to use this much CPU, memory or other recources. That was the big milestone that actually lies in whole containerization thing nowadays. There was several tools that used cgroups and allowed so called containerization of application: like OpenVZ, lxc and so on.

But what docker did and what is basically killer feature of it is this? It is layered filesystem. What do you need to start your application? JDK, python, node? This how it is done: spin up virtual machine (or bare metal) install all the dependencies for you application, throw a lot of effort into configuration of oftenly conflicting tools and deploy you application. Docker took the part with dependency installation and tools configuration off of you shoulders. Docker images ship every tool you need already installed. So all you need is to know how to start _your_ application.
(TODO: mention `dive` utility)

## Differences with VM's

<blockquote>Docker is not about virtualization but isolation.</blockquote>

Though it is often said that docker is like virtual machines it is not. The thing is that application running docker container is just an isolated process with dependencies available to that process only. That simple!

## Architecture overview

[This is the best starting point for architecture](https://docs.docker.com/engine/docker-overview/). But for developer it is essential to understand what is image and what is container. Images are recepie, container is running application. Container is ephermal