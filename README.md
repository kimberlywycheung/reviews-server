# Techstyles Reviews & Ratings Service

The Techstyles Reviews & Ratings Service supports Reviews of the [Techstyles clothing brand product page](https://github.com/KFEC/TechStyles).

## Overview

This Reviews & Ratings service is supported by 5 AWS EC2 instances:
- 3 identical Host Servers
- 1 NGINX Load Balancer
- 1 Postgres Database
All load tests were performed via [loader.io](loader.io).

## Goals:

With an goal of 1000RPS with <1% error rate and <2000ms response time, Techstyles Reviews & Ratings Service met 100% of these requirements. The above system supports 1000 client requests per second with an average response time of 8 milliseconds and 0.6% error rate.

### Initial Performance:

With the database and a single host server deployed to AWS, initial stress tests showed that the service performed at 2005ms avg latency with 0% error rate at 1000RPS.

<details>
  <summary>See More</summary>
  
  ![](assets/Pre-optimization.png)

</details>


### Post-Optimization Performance:

NGINX cache & load balancer were implemented and deployed to distribute request in round-robin fashion. This was deployed alongside 2 additional servers.

With these changes, latency decreased by 99.6%, handling 1000RPS at 8ms avg latency with 0.6% error rate.

<details>
  <summary>See More</summary>

  ![](assets/Post-optimization.png)
  
  </details>

### Tech Stack:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Contact
Kimberly Cheung - [![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kimberlywycheung/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kimberlywycheung)
