# Deployment solution

- Status: 🟢accepted
- Author: Maxime Sraiki
- Date created: 2020-12-18

## Context and Problem Statement

This analysis has been done in 2020, when we started redesigning Geotrek-rando globally, to choose the right technology.  
We needed to have an easy way to deploy this server for it to be runnable on the most various environments.

## Decision Drivers sorted by priority

- Easily installable and runnable on various environments
- Easily deployed
- Maintainable

## Considered Options

- Ubuntu packages & Personal Private Archive (PPA)
- Provisioning via ansible + deployment via github or shipit
- Docker

## Decision Outcome

Chosen option: **"NextJS server side rendering solution for React"**.

## Evaluation of the Options (from 1:❌KO to 5:✅Excellent)

|                                                         | Ubuntu packages & Personal Private Archive (PPA) | Provisioning via ansible + deployment via github or shipit | Docker |
| :-----------------------------------------------------: | :----------------------------------------------: | :--------------------------------------------------------: | ------ |
| Easily installable and runnable on various environments |                        3                         |                            5 ✅                            | 5 ✅   |
|                     Easily deployed                     |                        3                         |                             4                              | 5 ✅   |
|                      Maintainable                       |                        2                         |                             3                              | 4      |
|                     **Total Score**                     |                        8                         |                             12                             | **14** |

## Pros and Cons of the Options

### Ubuntu packages & Personal Private Archive (PPA)

- Very easily installable on ubuntu machines

### Provisioning via ansible + deployment via github or shipit

- Deployable on every platform

### Docker

- Deployable on every platform
- Easy to deploy
- Modern technology where the market skills are heading
