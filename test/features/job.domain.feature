Feature: Creating a job

  @component
  @api
  Scenario Outline: Creates a job offer
    Given Creating a job offer with <title>, <address>, <description>, <salary>, <contract_type>, <author>
    When I save the job offer
    Then I received a <message> created

    Examples:
      | title             | address | description          | salary      | contract_type | author     | message   |
      | "developpeur web" | "paris" | "dev web javascript" | "5000 EURO" | "CDI"         | "wemanity" | "Success" |

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

