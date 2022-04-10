Feature: Job Posting

  @JobPosting
  Scenario: A user wants to post a job
    Given a user job with details as shown in the table
      | title       | "fullstack developer Java" |
      | address     | paris          |
      | salary      | 5000           |
      | company     | wemanity       |
      | description | "Java, Spring, Hibernate" |
    When the user posts the job
    Then The job is created as shown in the table 
      | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
      | title       | "fullstack developer Java" |
      | address     | paris          |
      | salary      | 5000           |
      | company     | wemanity       |
      | description | "Java, Spring, Hibernate" |
    And a message <message> is shown
      | message  | created |

  @JobPosting
  Scenario: A client wants to update a posted job
    Given an existing job with details as followed
      | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
      | title       | "fullstack developer Java" |
      | address     | paris          |
      | salary      | 5000           |
      | company     | wemanity       |
      | description | "Java, Spring, Hibernate" |
    When The user updates a few attributes of the job identified by id as shown
      | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
      | title       | "fullstack developer Java/Kotlin"    |
      | description | "Java/Kotlin, Spring, Hibernate"     |
      | salary      | 5500                                 |
    Then The job is modified as followed
      | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
      | title       | "fullstack developer Java/Kotlin" |
      | address     | paris          |
      | salary      | 5500           |
      | company     | wemanity       |
      | description | "Java/Kotlin, Spring, Hibernate" |
    And a message <message> is shown
      | message  | updated |

  @JobPosting
  Scenario: The user wants to delete a job
    Given an existing job with details as followed
      | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
      | title       | "fullstack developer Java" |
      | address     | paris          |
      | salary      | 5000           |
      | company     | wemanity       |
      | description | "Java, Spring, Hibernate" |
    When The user deletes the job identified by id as below
      | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
    Then The job identified by id as below is deleted
      | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
    And a message <message> is shown
      | message  | deleted |

  @JobPosting
  Scenario: a user wants to a see a job detail
    Given an existing job with details as followed
      | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
      | title       | "fullstack developer Java" |
      | address     | paris          |
      | salary      | 5000           |
      | company     | wemanity       |
      | description | "Java, Spring, Hibernate" |
    When The user opens the job identified by id as below for details
      | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
    Then The job detail is displayed as followed
      | id          | 6ba7b810-9dad-11d1-80b4-00c04fd430c8 |
      | title       | "fullstack developer Java" |
      | address     | paris          |
      | salary      | 5000           |
      | company     | wemanity       |
      | description | "Java, Spring, Hibernate" |

  @JobPosting
  Scenario: The user wants to list all current jobs
    Given The existing jobs as followed
      | id                                    | title                         | address | salary | company     | description            | 
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c1  | "Developpeur java"            | "paris" | 5000   | "wemanity"  | "dev web javascript docker"                 |
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c2  | "Developpeur node"            | "paris" | 5000   | "wemanity"  | "dev web javascript docker kubernetes"      |
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c3  | "Developpeur node react"      | "paris" | 5000   | "wemanity"  | "dev web javascript java typescript docker" |
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c4  | "Developpeur python angular"  | "paris" | 5000   | "wemanity"  | "dev web javascript"                        |
    When The user lists all jobs
    Then All jobs appear in the list as followed:
      | id                                    | title                         | address | salary | company     | description            | 
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c1  | "Developpeur java"            | "paris" | 5000   | "wemanity"  | "dev web javascript docker"                 |
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c2  | "Developpeur node"            | "paris" | 5000   | "wemanity"  | "dev web javascript docker kubernetes"      |
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c3  | "Developpeur node react"      | "paris" | 5000   | "wemanity"  | "dev web javascript java typescript docker" |
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c4  | "Developpeur python angular"  | "paris" | 5000   | "wemanity"  | "dev web javascript"                        |

  @JobPosting
  Scenario: The employer wants to search jobs according to some keywords
    Given The existing jobs as followed
      | id                                    | title                         | address | salary | company     | description                                 | 
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c1  | "Developpeur java"            | "paris" | 5000   | "wemanity"  | "dev web javascript docker"                 |
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c2  | "Developpeur node"            | "paris" | 5000   | "wemanity"  | "dev web javascript docker kubernetes"      |
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c3  | "Developpeur node react"      | "paris" | 5000   | "wemanity"  | "dev web javascript java typescript docker" |
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c4  | "Developpeur python angular"  | "paris" | 5000   | "wemanity"  | "dev web javascript"                        |
    When The user searches jobs with keywords as below
      | keywords | node,docker,kubernetes |
    Then All jobs appear in the list by matched order as followed :
      | id                                    | title                         | address | salary | company     | description                                 | matched | 
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c2  | "Developpeur node"            | "paris" | 5000   | "wemanity"  | "dev web javascript docker kubernetes"      | 3       |
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c3  | "Developpeur node react"      | "paris" | 5000   | "wemanity"  | "dev web javascript java typescript docker" | 2       |
      | 6ba7b810-9dad-11d1-80b4-00c04fd430c1  | "Developpeur java"            | "paris" | 5000   | "wemanity"  | "dev web javascript docker"                 | 1       |
