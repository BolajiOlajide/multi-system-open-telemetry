# Multi-System Open Telemetry

My lazy attempt at implementing open telemetry in a pseudo-distributed systems.
Everything in here is orchestrated by docker and an `nginx` reverse proxy sits in front of all the services. The available routes are:

- **/dashboard** to access the dashboard services
- **/movies** to access the movies services
- **/prom** to access the prometheus service
- **/zipkin** to access the zipkin service
