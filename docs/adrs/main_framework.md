# Main framework

- Status: 🟢accepted
- Author: Maxime Sraiki
- Date created: 2020-12-17

## Context and Problem Statement

This analysis has been done in 2020, when we started redesigning Geotrek-rando globally, to choose the right technology.  
In order to produce a scalable, performant and efficient front, we needed to choose the right framework head start.

## Decision Drivers sorted by priority

- SEO
- Performance
- Offline
- PWA integration
- Easily deployable on several configurations
- Frontend lead time
- Developper onboarding time
- Scalability
- Standardized Tech
- Low long term maintainance and evolutivity overhead
- Reusable logic for potential mobile application

## Considered Options

- Single hosted single page application (SPA) in React with React helmet
- NextJS server side rendering solution for React

## Decision Outcome

Chosen option: **"NextJS server side rendering solution for React"**.

## Evaluation of the Options (from 1:❌KO to 5:✅Excellent)

|                                                     | Single hosted SPA in React with React helmet | NextJS server side rendering solution for React |
| :-------------------------------------------------: | :------------------------------------------: | :---------------------------------------------: |
|                         SEO                         |                      2                       |                      5 ✅                       |
|                     Performance                     |                      3                       |                      5 ✅                       |
|                       Offline                       |                     5 ✅                     |                      5 ✅                       |
|                   PWA integration                   |                      4                       |                      5 ✅                       |
|     Easily deployable on several configurations     |                     5 ✅                     |                       5✅                       |
|                 Frontend lead time                  |                     5 ✅                     |                      5 ✅                       |
|             Developper onboarding time              |                     5 ✅                     |                        4                        |
|                     Scalability                     |                      3                       |                        4                        |
|                  Standardized Tech                  |                     5 ✅                     |                      5 ✅                       |
| Low long term maintainance and evolutivity overhead |                     5 ✅                     |                      5 ✅                       |
|   Reusable logic for potential mobile application   |                     5 ✅                     |                        3                        |
|                   **Total Score**                   |                      47                      |                     **51**                      |

## Pros and Cons of the Options

### Single hosted SPA in React with React helmet

- The developer onboarding time is better on an SPA as there is no separations between server side rendered code and dynamically fed UI to handle
- An SPA is much more similar to a react native mobile application as it as all its content served empty and fetches the data dynamically

### NextJS server side rendering solution for React

- The performances offered by server side rendering is more optimisable than with SPA as some pages can be rendered statically and caching can be applied to data & layout
- The PWA integration in Next is coming out of the box
- The SEO is assured as all the pages are rendered on the server side and is compatible with google referencement crawlers. Helmet could provide this as well but requires specific configuration on each page
- Some of the product complexity (such as routing) is handled automatically by the framework and retrieve the complications of handling complexe navigation front side

=> Considering the criticality of SEO, performance and PWA integration for this project, this is the solution we retained.

## Links and resources

- [NextJS SEO for react websites](https://rubygarage.org/blog/seo-for-react-websites)
- [Performance study between CSR and SSR](https://blog.logrocket.com/next-js-vs-create-react-app/)
- [PWA integration for NextJS](https://github.com/shadowwalker/next-pwa#readme)
