/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const config = require('config')
const nock = require('nock')
const { sendDocuments } = require('../documents')

const $query = () => ({ patch: () => {} })

const declarationWithLotsOfDocuments = {
  id: 649,
  userId: 88,
  hasWorked: true,
  hasTrained: false,
  hasInternship: true,
  hasSickLeave: true,
  hasMaternityLeave: false,
  hasRetirement: true,
  hasInvalidity: false,
  isLookingForJob: false,
  jobSearchStopMotive: 'other',
  hasFinishedDeclaringEmployers: true,
  isFinished: false,
  createdAt: '2019-01-28T08:06:29.438Z',
  updatedAt: '2019-02-21T12:27:30.515Z',
  monthId: 9,
  isTransmitted: true,
  isEmailSent: true,
  isDocEmailSent: true,
  metadata: {},
  dates: {
    sickLeaves: [
      {
        startDate: '2018-12-31T23:00:00.000Z',
        endDate: '2019-01-01T23:00:00.000Z',
      },
      {
        startDate: '2019-01-29T23:00:00.000Z',
        endDate: '2019-01-30T23:00:00.000Z',
      },
    ],
    retirement: {
      startDate: '2019-01-14T23:00:00.000Z',
    },
    jobSearch: {
      endDate: '2019-01-22T23:00:00.000Z',
    },
    internships: [
      {
        startDate: '2019-01-08T23:00:00.000Z',
        endDate: '2019-01-09T23:00:00.000Z',
      },
      {
        startDate: '2019-01-14T23:00:00.000Z',
        endDate: '2019-01-15T23:00:00.000Z',
      },
      {
        startDate: '2019-01-28T23:00:00.000Z',
        endDate: '2019-01-29T23:00:00.000Z',
      },
    ],
  },
  documents: [
    {
      id: 30,
      type: 'internship',
      declarationId: 649,
      file: '../tests/mockDocument.pdf',
      isTransmitted: false,
      createdAt: '2019-02-21T11:19:50.794Z',
      updatedAt: '2019-02-21T12:27:09.327Z',
      $query,
    },
    {
      id: 33,
      type: 'sickLeave',
      declarationId: 649,
      file: '../tests/mockDocument.pdf',
      isTransmitted: false,
      createdAt: '2019-02-21T11:20:00.131Z',
      updatedAt: '2019-02-21T12:27:13.300Z',
      $query,
    },
    {
      id: 29,
      type: 'retirement',
      declarationId: 649,
      file: '../tests/mockDocument.pdf',
      isTransmitted: false,
      createdAt: '2019-02-21T11:19:46.939Z',
      updatedAt: '2019-02-21T12:27:16.263Z',
      $query,
    },
    {
      id: 28,
      type: 'internship',
      declarationId: 649,
      file: '../tests/mockDocument.pdf',
      isTransmitted: false,
      createdAt: '2019-02-21T11:19:40.300Z',
      updatedAt: '2019-02-21T12:27:19.140Z',
      $query,
    },
    {
      id: 25,
      type: 'internship',
      declarationId: 649,
      file: '../tests/mockDocument.pdf',
      isTransmitted: false,
      createdAt: '2019-02-20T17:20:54.140Z',
      updatedAt: '2019-02-21T12:27:22.093Z',
      $query,
    },
    {
      id: 31,
      type: 'sickLeave',
      declarationId: 649,
      file: '../tests/mockDocument.pdf',
      isTransmitted: false,
      createdAt: '2019-02-21T11:19:55.300Z',
      updatedAt: '2019-02-21T12:27:24.835Z',
      $query,
    },
  ],
  employers: [
    {
      id: 2070,
      userId: 88,
      declarationId: 649,
      employerName: 'Amuro Ray',
      workHours: 222,
      salary: 894,
      hasEndedThisMonth: false,
      createdAt: '2019-01-28T08:07:38.640Z',
      updatedAt: '2019-02-21T11:20:00.140Z',
      documents: [
        {
          id: 2320,
          file: '../tests/mockDocument.pdf',
          isTransmitted: false,
          createdAt: '2019-02-18T12:38:46.552Z',
          updatedAt: '2019-02-21T12:27:27.699Z',
          type: 'salarySheet',
          employerId: 2070,
          $query,
        },
      ],
    },
    {
      id: 2069,
      userId: 88,
      declarationId: 649,
      employerName: 'SMS Shoutai',
      workHours: 122,
      salary: 490,
      hasEndedThisMonth: true,
      createdAt: '2019-01-28T08:07:38.640Z',
      updatedAt: '2019-02-21T11:20:00.140Z',
      documents: [
        {
          id: 2319,
          file: '../tests/mockDocument.pdf',
          isTransmitted: false,
          createdAt: '2019-02-18T12:38:44.215Z',
          updatedAt: '2019-02-21T12:27:30.495Z',
          type: 'salarySheet',
          employerId: 2069,
          $query,
        },
      ],
    },
  ],
  declarationMonth: {
    id: 9,
    month: '2018-12-31T23:00:00.000Z',
    startDate: '2019-01-27T23:00:00.000Z',
    endDate: '2019-02-21T23:00:00.000Z',
    createdAt: '2019-01-10T14:08:40.453Z',
    updatedAt: '2019-02-21T11:20:00.164Z',
  },
}

const accessToken = 'AZERTYUIOP'

describe('PE API: sendDocuments', () => {
  const conversionId = 1
  let uploadScope
  let confirmationScope
  const parsedUploadHeadersArray = []
  const parsedConfirmationBodyArray = []
  const parsedConfirmationHeadersArray = []

  describe('API call success', () => {
    beforeAll(() => {
      uploadScope = nock(config.apiHost)
        .post(`/partenaire/peconnect-envoidocument/v1/depose?synchrone=true`)
        .reply(function() {
          parsedUploadHeadersArray.push(this.req.headers)
          return [200, { conversionId }]
        })
        .persist()

      confirmationScope = nock(config.apiHost)
        .post(
          `/partenaire/peconnect-envoidocument/v1/depose/${conversionId}/confirmer`,
          (body) => {
            parsedConfirmationBodyArray.push(body)
            return body
          },
        )
        .reply(function() {
          parsedConfirmationHeadersArray.push(this.req.headers)
          return [200]
        })
        .persist()
    })

    afterAll(() => {
      uploadScope.persist(false)
      confirmationScope.persist(false)
    })

    it('should send formatted data for declarations', async () => {
      const declarations = [declarationWithLotsOfDocuments]

      for (const declaration of declarations) {
        await sendDocuments({
          declaration,
          accessToken,
        })
        expect(parsedConfirmationBodyArray).toMatchSnapshot()
        parsedUploadHeadersArray
          .concat(parsedConfirmationHeadersArray)
          .forEach((headers) => {
            expect(headers.authorization).toContain(accessToken)
            expect(headers.accept).toBe('application/json')
            expect(headers.media).toBe('M')
            expect(headers['accept-encoding']).toBe('gzip')
          })
        parsedUploadHeadersArray.forEach((headers) => {
          expect(headers['content-type']).toContain('multipart/form-data;')
        })
      }
    })
  })
})