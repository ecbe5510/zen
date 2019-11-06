const fs = require('fs')
const { format, subDays } = require('date-fns')
const { Parser } = require('json2csv')

const winston = require('../lib/log')

const User = require('../models/User')

const EXPORT_DIR = '/mnt/datalakepe/vers_datalake/'
const EXPORT_FILENAME_PATH = `${EXPORT_DIR}export_utilisateur.csv`
const EXPORT_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'postalCode',
  'gender',
  'isAuthorized',
  'peId',
]

const renameFile = (from, to) =>
  new Promise((resolve, reject) => {
    fs.rename(from, to, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })

const saveUnauthorizedUsersInCSV = async () => {
  winston.info('Starting export users')

  // Archive current file if exists
  if (fs.existsSync(EXPORT_FILENAME_PATH)) {
    const yesterdayDate = format(subDays(new Date(), 1), 'YYYY-MM-DD')

    try {
      await renameFile(
        `${EXPORT_FILENAME_PATH}`,
        `${EXPORT_DIR}${yesterdayDate}.csv`,
      )
    } catch (err) {
      winston.error(err)
      throw err
    }
  }

  // Create file
  fs.openSync(EXPORT_FILENAME_PATH, 'w')

  // Extract and save in new file
  return User.query()
    .where({ isAuthorized: 'false' })
    .then((users) => {
      const json2csvParser = new Parser({ fields: EXPORT_FIELDS })
      const csvContent = json2csvParser.parse(users)

      fs.writeFile(EXPORT_FILENAME_PATH, csvContent, function(err) {
        if (err) {
          winston.error(err)
          throw err
        }

        winston.info('Finished export users')
      })
    })
}

module.exports = {
  saveUnauthorizedUsersInCSV,
  EXPORT_FIELDS,
}
