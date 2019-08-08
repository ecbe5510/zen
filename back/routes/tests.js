const express = require('express')
const { addWeeks, subWeeks } = require('date-fns')

const User = require('../models/User')
const Declaration = require('../models/Declaration')
const Employer = require('../models/Employer')
const DeclarationMonth = require('../models/DeclarationMonth')

if (process.env.NODE_ENV !== 'test') {
  throw new Error('This routes are ONLY meant for automatic testing purposes')
}

const router = express.Router()

const defaultFemaleUser = {
  firstName: 'Harry',
  lastName: 'Pisces',
  email: 'harry@pisces.com',
  gender: 'female',
  postalCode: '59160',
  peId: 'acbdefghi',
}

const defaultDeclaration = {
  userId: 1,
  hasWorked: true,
  hasTrained: false,
  hasInternship: false,
  hasSickLeave: false,
  hasMaternityLeave: false,
  hasRetirement: false,
  hasInvalidity: false,
  isLookingForJob: true,
  hasFinishedDeclaringEmployers: true,
  isFinished: false,
  createdAt: '2019-01-02T15:55:29.957Z',
  updatedAt: '2019-01-07T11:54:01.296Z',
  monthId: 8,
  isTransmitted: false,
  isEmailSent: false,
  isDocEmailSent: false,
}
const employer1 = {
  employerName: 'Marie',
  workHours: 232,
  salary: 41,
  hasEndedThisMonth: false,
  declarationId: 1,
}

const employer2 = {
  employerName: 'Paul',
  workHours: 23,
  salary: 34,
  hasEndedThisMonth: false,
  declarationId: 1,
}

const getBooleanValue = (str) => str.toLowerCase() === 'true'

const truncateDatabase = () =>
  User.knex().raw(
    `
      TRUNCATE
      "Users",
      activity_logs,
      declaration_infos,
      declaration_months,
      declaration_reviews,
      declarations,
      employer_documents,
      employers,
      session,
      status
      CASCADE
    `,
  )

const insertUser = (userOverride = {}) => {
  const user = {
    ...defaultFemaleUser,
    ...userOverride,
  }
  return User.query().insertAndFetch(user)
}

const insertDeclaration = ({
  userId,
  declarationMonthId,
  declarationOverride = {},
}) => {
  const declaration = {
    ...defaultDeclaration,
    ...declarationOverride,
  }
  declaration.userId = userId
  declaration.monthId = declarationMonthId

  return Declaration.query().insertAndFetch(declaration)
}

const insertEmployer = ({ employer, userId, declarationId }) => {
  employer.userId = userId
  employer.declarationId = declarationId
  return Employer.query().insertAndFetch(employer)
}

const insertDeclarationMonth = () =>
  DeclarationMonth.query().insert({
    month: new Date(),
    startDate: subWeeks(new Date(), 1),
    endDate: addWeeks(new Date(), 1),
  })

const setServiceUp = () =>
  User.knex().raw('INSERT INTO status (up) values (true)')

const fillSession = (req, user) => {
  req.isServiceUp = true

  req.session.user = {
    ...user,
    isAuthorized:
      'authorizeUser' in req.query
        ? getBooleanValue(req.query.authorizeUser)
        : true,
    canSendDeclaration:
      'allowDeclaration' in req.query
        ? getBooleanValue(req.query.allowDeclaration)
        : true,
    hasAlreadySentDeclaration:
      'hasAlreadySentDeclaration' in req.query
        ? getBooleanValue(req.query.hasAlreadySentDeclaration)
        : false,
    tokenExpirationDate: '2059-05-06T13:34:15.985Z',
  }
  req.session.userSecret = {
    accessToken: 'abcde',
    idToken: 'fghij',
  }
}

router.post('/db/reset-for-files', (req, res, next) =>
  truncateDatabase()
    .then(() =>
      Promise.all([
        insertUser(req.body.userOverride),
        insertDeclarationMonth(),
        setServiceUp(),
      ]),
    )
    .then(([user, declarationMonth]) => {
      fillSession(req, user)
      return insertDeclaration({
        userId: user.id,
        declarationMonthId: declarationMonth.id,
        declarationOverride: req.body.declarationOverride,
      })
    })
    .then((declaration) =>
      Promise.all([
        insertEmployer({
          employer: employer1,
          userId: declaration.userId,
          declarationId: declaration.id,
        }),
        insertEmployer({
          employer: employer2,
          userId: declaration.userId,
          declarationId: declaration.id,
        }),
      ]),
    )
    .then(() => {
      res.json('ok')
    })
    .catch(next),
)

router.post('/db/reset', (req, res, next) =>
  truncateDatabase()
    .then(() =>
      Promise.all([
        insertUser(req.body.userOverride),
        insertDeclarationMonth(),
        setServiceUp(),
      ]),
    )
    .then(([user]) => {
      fillSession(req, user)
      res.json('ok')
    })
    .catch(next),
)

module.exports = router