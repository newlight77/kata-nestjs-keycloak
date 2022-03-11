Feature: Creating a job

  @component
  @api
  Scenario Outline: Creates a job offer
    Given Creating a job offer with <title>, <address>, <description>, <salary>, <contract_type>, <author>
    When I save the job offer
    Then I received a <message> created

    Examples:
      | title             | address | salary | currency | contract_type | author     | message   | description          |
      | "developpeur web" | "paris" | 50000  | "euro"   | "CDI"         | "wemanity" | "Success" | "dev web javascript" |

  @wip
  @component
  @api
  Scenario Outline: Creates an incomplete example
    Given Writing a example with <description>
    When I save the example
    Then I received a <message> message

    Examples:
      | description | message                       |
      | ""          | "Cannot create empty example" |

  @wip
  @component
  @api
  Scenario Outline: Testing post request
    Given Writing a example with <description>
    When I submit the example
    Then I received a <message> message

    Examples:
      | description       | message                       |
      | "salut c'est moi" | "Success"                     |
      | ""                | "Cannot create empty example" |

