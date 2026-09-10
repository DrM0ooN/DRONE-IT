**DRONE-IT**

Smart Drone Delivery Hub Platform

Senior Project Proposal

Richard Danc

George prokopakis

May 2026

# 1. Project Title

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>DRONE-IT — Smart Drone Delivery Hub Platform</strong></p>
<p>A web-based platform that allows urban citizens to find the DRONE-IT smart delivery hubs in their vicinity on an interactive map and order last-mile drone deliveries of packages, food or pharmacy products. The system is designed to incorporate EU/EASA drone airspace regulations to ensure regulatory compliance and to focus on the Czech Republic as the main operational environment.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

# 2. Aims and Objectives

## 2.1 Problem Statement

Last mile delivery is one of the most expensive and time-consuming parts of today's logistics. It is particularly difficult for time-sensitive deliveries, like medicine or food, due to traffic jams, expensive labour and slow courier turnaround. Consumer adoption is hindered by the lack of available infrastructure and a single digital interface, though autonomous drone delivery is an attractive option. DRONE-IT fills this void by offering a platform that allows users to locate a nearby hub, place an order, and it will be delivered to them by drone within minutes.

## 2.2 Aims

- Design and develop a web application (React + Django) that enables users to find DRONE-IT smart hubs on a Leaflet.js map and order deliveries.

- Research drone delivery in urban areas feasibility and legal limitations in the context of EASA and Czech CAA regulations.

- Discuss the architectural problems faced in building a scalable system to integrate geospatial data, a RESTful API, and a reactive map interface.

## 2.3 Objectives

- Implement a secure JWT-based user authentication system (registration, login, profile).

- Create an interactive map using Leaflet.js with clustered DRONE-IT hub markers from the backend.

- Enable users to navigate to hubs, read details and request a delivery via the UI.

- Store hub locations, user data, and order records in a PostgreSQL database managed by Django.

- Add EASA no-fly zones and restricted airspace as a toggleable GeoJSON layer to the map.

- Create a functional prototype and a research chapter for the thesis.




# 3. Research Questions

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>RQ1 — Regulatory Feasibility</strong></p>
<p>To what extent do current EASA Open and Specific category regulations permit autonomous drone delivery in urban Czech Republic environments, and how can a software platform represent and enforce these constraints for end users?</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Scope: This question investigates EASA Delegated Regulation (EU) 2019/945 and Implementing Regulation (EU) 2019/947, the Czech CAA national rules, U-space service requirements, and how no-fly zone geodata can be sourced and visualized in the DRONE-IT platform.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>RQ2 — Smart Hub Network Design</strong></p>
<p>What is an effective way to distribute DRONE-IT smart delivery hubs in a city and how does the density of these hubs influence the convenience and coverage of last mile delivery for urban customers?</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Scope: This question examines facility location principles, proximity analysis using GeoJSON and Leaflet, and population density considerations. A case study of Prague will serve as the primary test environment, using district-level population data to validate initial hub placements.

# 4. Technologies to be Used

| **Category**    | **Technology**               | **Purpose**                                        |
|-----------------|------------------------------|----------------------------------------------------|
| Frontend        | React.js                     | SPA UI with component-based architecture           |
| Mapping         | Leaflet.js / React-Leaflet   | Interactive map with hub markers and zone overlays |
| Backend         | Django (Python)              | REST API, business logic, user management          |
| API Framework   | Django REST Framework        | RESTful endpoints consumed by the React frontend   |
| Database        | PostgreSQL                   | Persistent storage for users, hubs, and orders     |
| Geo Data        | GeoJSON                      | Encoding hub locations and no-fly zone boundaries  |
| Ext. Data       | EASA / Czech CAA GeoZone API | Regulatory airspace and no-fly zone data           |
| Auth            | JWT (simplejwt)              | Secure stateless user sessions                     |
| Version Control | Git / GitHub                 | Source code management                             |
| IDE             | VS Code                      | Primary development environment                    |

The component-based architecture and the good integration with Leaflet were the reasons for selecting React. Django offers a well-developed ORM and REST framework that is suitable for handling geo-entities and user data. Leaflet was chosen over Google Maps because it is open source, has a small footprint, and supports GeoJSON well, which is crucial for displaying regulatory zone information.

# 5. Project Timeline

The Gantt chart below covers the Spring 2026 semester (February – May 2026), broken down by week. Blue shaded cells indicate active work periods for each task.

Key milestones: (1) Requirements & architecture locked — end of February (2) Backend REST API + Leaflet map with live hub data — end of March (3) Feature-complete MVP — mid-April (4) Final evaluation, demo, and thesis submission — May 2026.

# 6. Expected Outcomes

## 6.1 Software Artifacts

- A deployed full-stack web application with user authentication, interactive hub map, and delivery request flow.

- A Django REST API with documented endpoints for hubs, orders, users, and GeoJSON zone data.

- A GeoJSON dataset of DRONE-IT hub locations across Prague with metadata (address, capacity, operating hours).

- An EASA no-fly zone overlay integrated as a toggleable layer in the Leaflet map.

## 6.2 Academic Artifacts

- A complete Senior Project thesis covering literature review, system design, implementation, and evaluation.

- A research chapter addressing both research questions with supporting academic references.

- A GitHub repository with full commit history demonstrating iterative development.

# 7. Risks and Barriers

| **Risk**                      | **Likelihood** | **Impact** | **Mitigation**                                                        |
|-------------------------------|----------------|------------|-----------------------------------------------------------------------|
| Regulatory complexity         | High           | Medium     | Focus on displaying EASA zones; no actual drone flight control needed |
| Real-time data availability   | Medium         | High       | Use static GeoJSON first; live data as later-sprint extension         |
| Map performance (many hubs)   | Medium         | Low        | Implement marker clustering with Leaflet.markercluster                |
| Scope creep                   | High           | Medium     | Maintain strict MVP feature list; defer extras post-thesis            |
| Solo workload / time pressure | High           | High       | Weekly milestones in Gantt; buffer weeks built in                     |
| API integration bugs          | Medium         | Medium     | Test all endpoints in Postman before React connection                 |

# 8. Method of Evaluation

## 8.1 Technical Evaluation

- Unit and integration tests for Django API endpoints using pytest-django; target 80%+ coverage on critical routes (auth, hub lookup, order creation).

- Frontend component testing with React Testing Library, covering map rendering and form interaction flows.

- Load-time benchmark: map rendering with 50+ hub markers should complete in under 2 seconds on a standard connection.

## 8.2 User Evaluation

- Usability testing with 5–8 participants (recruited from the university), performing tasks such as finding the nearest hub and placing a simulated delivery order.

- Post-task System Usability Scale (SUS) questionnaire to produce a quantitative usability score.

- Ideally, feedback from a real stakeholder — such as a local pharmacy or small delivery business — willing to preview the prototype and assess practical value.

## 8.3 Research Evaluation

- Each research question will be answered using evidence from the implementation, regulatory analysis, and user feedback, cross-referenced with academic literature cited in the thesis.

# 9. Proof-of-Concept Prototype

A working prototype has been developed during the first semester. It demonstrates that the chosen technology stack is viable and that the primary integration challenges are understood and addressable.

## 9.1 Features Implemented So Far

- User registration and JWT-based login (React frontend communicating with Django backend).

- Interactive Leaflet.js map rendered within the React application, centered on Prague.

- DRONE-IT hub markers displayed on the map at defined coordinate locations.

- Basic responsive layout with navigation between the login view and the map view.

## 9.2 Prototype Screenshots

See the screenshots in the main repository README.

The prototype confirms that: (a) React and Django communicate reliably over a REST API, (b) Leaflet hub markers can be rendered from backend-provided coordinates, and (c) the JWT auth flow works end-to-end. The primary next step is connecting live database-driven hub data to the map and adding the delivery request flow.

# 10. Research Chapter

## 10.1 Drone Delivery — Context and Commercial Landscape

The idea of autonomous drone delivery has been a major focus of research and commercial interest for the last decade. Amazon Prime Air, Wing (Alphabet), and Manna Aero are pioneering operators that have shown that last-mile delivery is feasible in controlled environments (Bamburry, 2015; Singireddy & Daim, 2018). The heart of the business model is about speed and cost savings for short-range, lightweight deliveries, which is precisely what DRONE-IT is tackling. Stolaroff et al. (2018) also showed that small electric drones emit less in their life cycle than conventional diesel vans, which further bolsters the environmental argument for drone delivery in dense urban areas.

## 10.2 EU and Czech Regulatory Framework (EASA)

The European Union Aviation Safety Agency (EASA) has significantly clarified the regulatory environment in the EU and Czech Republic. The technical requirements for drone classes are laid down in Delegated Regulation (EU) 2019/945 and the operational rules are set out in Implementing Regulation (EU) 2019/947. Commercial deliveries in urban areas are mostly classified in the Specific category, which needs a Specific Operations Risk Assessment (SORA) and specific authorization from the Czech CAA (UCL). The Open category allows for lower risk operations without prior authorization, with weight and altitude limits, which can be useful for lighter deliveries in less congested areas.

The EU U-space framework (Commission Implementing Regulation (EU) 2021/664) introduces mandatory digital services such as geo-awareness, flight authorisation and traffic information. A geo-awareness service must let the operators know if there are any geographical restrictions to their intended operation. DRONE-IT directly addresses RQ1 by consuming publicly available zone data from the Czech CAA or EUROCONTROL SWIM services, and then rendering compliant airspace overlays on the Leaflet map.

## 10.3 Smart Hub Location Allocation

The facility location problem is a classic problem in which the objective is to determine the locations of delivery hubs. The main factors for urban drone delivery are: close to dense residential areas, close to supplier nodes (pharmacies, restaurants, warehouses), maximum drone range, and avoiding restricted airspace. Aurambout et al. (2019) suggested the use of GIS-based methods based on Voronoi partitioning and k-means clustering on the population density grid for the placement of drone hubs in European cities. DRONE-IT follows a simplified version of this analysis: the population data of the districts in the city of Prague will be used to validate the initial placements of the hubs and in future iterations, algorithmic optimization will be applied to maximize the coverage and minimize the average distance that users have to walk to reach the nearest hub.

## 10.4 System Architecture Considerations

One of the main architectural challenges of DRONE-IT is separating the geospatial rendering layer (Leaflet on the React frontend) from the data persistence layer (PostgreSQL via Django). The GeoJSON (Butler et al., 2016) is used as the interchange format, which is a widely adopted open standard for encoding geographic data. Hub coordinates and zone geometries are serialized as GeoJSON Feature Collections by Django REST Framework that are natively consumed by Leaflet. With this separation of concerns, the front end map can be modified without impacting the back end data model, making the platform more maintainable as it grows.

# 11. Acknowledgements

This proposal was prepared with the assistance of Claude (Anthropic), used as a writing aid for drafting, editing, and verifying references. All technical decisions, research conclusions, and final content are the authors' own.

# 12. References

Agatz, N., Bouman, P., & Schmidt, M. (2018). Optimization approaches for the traveling salesman problem with drone. Transportation Science, 52(4), 965–981.

Aurambout, J.-P., Gkoumas, K., & Ciuffo, B. (2019). Last mile delivery by drones: an estimation of viable market potential and access to citizens across European cities. European Transport Research Review, 11(1), 30.

Bamburry, D. (2015). Drones: Designed for product delivery. Design Management Review, 26(1), 40–48.

Butler, H., Daly, M., Doyle, A., Gillies, S., Hagen, S., & Schaub, T. (2016). The GeoJSON format. RFC 7946. Internet Engineering Task Force.

European Union Aviation Safety Agency. (2019). Commission Delegated Regulation (EU) 2019/945 on unmanned aircraft systems and on third-country operators of unmanned aircraft systems. Official Journal of the European Union.

European Union Aviation Safety Agency. (2019). Commission Implementing Regulation (EU) 2019/947 on the rules and procedures for the operation of unmanned aircraft. Official Journal of the European Union.

European Commission. (2021). Commission Implementing Regulation (EU) 2021/664 on a regulatory framework for the U-space. Official Journal of the European Union.

Singireddy, S. R. R., & Daim, T. U. (2018). Technology roadmap: Drone delivery — Amazon Prime Air. In T. Daim (Ed.), Infrastructure and Technology Management (pp. 387–412). Springer.

Stolaroff, J. K., Samaras, C., O'Neill, E. R., Lubers, A., Mitchell, A. S., & Ceperley, D. (2018). Energy use and life cycle greenhouse gas emissions of drones for commercial package delivery. Nature Communications, 9(1), 409.

Urad pro civilni letectvi — Czech Civil Aviation Authority. (2023). Provoz bezpilotnich letadel: Pravidla pro provoz UAV v Ceske republice.
