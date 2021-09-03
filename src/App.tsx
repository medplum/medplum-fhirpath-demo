import { parseFhirPath } from '@medplum/core';
import React, { useEffect, useState } from 'react';
import './App.css';

const DEFAULT_EXPRESSION = 'Patient.name.where(use=\'usual\').given.first()';
const DEFAULT_RESOURCE = {
  "resourceType": "Patient",
  "id": "example",
  "address": [
    {
      "use": "home",
      "city": "PleasantVille",
      "type": "both",
      "state": "Vic",
      "line": [
        "534 Erewhon St"
      ],
      "postalCode": "3999",
      "period": {
        "start": "1974-12-25"
      },
      "district": "Rainbow",
      "text": "534 Erewhon St PeasantVille, Rainbow, Vic  3999"
    }
  ],
  "managingOrganization": {
    "reference": "Organization/1"
  },
  "name": [
    {
      "use": "official",
      "given": [
        "Peter",
        "James"
      ],
      "family": "Chalmers"
    },
    {
      "use": "usual",
      "given": [
        "Jim"
      ]
    },
    {
      "use": "maiden",
      "given": [
        "Peter",
        "James"
      ],
      "family": "Windsor",
      "period": {
        "end": "2002"
      }
    }
  ],
  "birthDate": "1974-12-25",
  "deceased": {
    "boolean": false
  },
  "active": true,
  "identifier": [
    {
      "use": "usual",
      "type": {
        "coding": [
          {
            "code": "MR",
            "system": "http://hl7.org/fhir/v2/0203"
          }
        ]
      },
      "value": "12345",
      "period": {
        "start": "2001-05-06"
      },
      "system": "urn:oid:1.2.36.146.595.217.0.1",
      "assigner": {
        "display": "Acme Healthcare"
      }
    }
  ],
  "telecom": [
    {
      "use": "home"
    },
    {
      "use": "work",
      "rank": 1,
      "value": "(03) 5555 6473",
      "system": "phone"
    },
    {
      "use": "mobile",
      "rank": 2,
      "value": "(03) 3410 5613",
      "system": "phone"
    },
    {
      "use": "old",
      "value": "(03) 5555 8834",
      "period": {
        "end": "2014"
      },
      "system": "phone"
    }
  ],
  "gender": "male",
  "contact": [
    {
      "name": {
        "given": [
          "Bénédicte"
        ],
        "family": "du Marché",
        "_family": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
              "valueString": "VV"
            }
          ]
        }
      },
      "gender": "female",
      "period": {
        "start": "2012"
      },
      "address": {
        "use": "home",
        "city": "PleasantVille",
        "line": [
          "534 Erewhon St"
        ],
        "type": "both",
        "state": "Vic",
        "period": {
          "start": "1974-12-25"
        },
        "district": "Rainbow",
        "postalCode": "3999"
      },
      "telecom": [
        {
          "value": "+33 (237) 998327",
          "system": "phone"
        }
      ],
      "relationship": [
        {
          "coding": [
            {
              "code": "N",
              "system": "http://hl7.org/fhir/v2/0131"
            }
          ]
        }
      ]
    }
  ]
};

function App() {
  const [expression, setExpression] = useState(DEFAULT_EXPRESSION);
  const [resource, setResource] = useState(JSON.stringify(DEFAULT_RESOURCE, undefined, 2));
  const [results, setResults] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setResults(JSON.stringify(parseFhirPath(expression).eval(JSON.parse(resource)), undefined, 2));
      setError(false);
    } catch (err) {
      setResults(err.message);
      setError(true);
    }
  }, [expression, resource]);

  return (
    <div className="App">
      <header className="App-header">
        <input value={expression} onChange={e => setExpression(e.target.value)} />
      </header>
      <div className="App-resource">
        <div className="textarea-container">
          <textarea value={resource} onChange={e => setResource(e.target.value)} />
        </div>
      </div>
      <div className="App-results">
        <div className="textarea-container">
          <textarea className={error ? 'error' : ''} value={results} disabled={true} />
        </div>
      </div>
    </div>
  )
}

export default App;
