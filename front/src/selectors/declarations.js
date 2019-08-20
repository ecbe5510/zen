import { createSelector } from 'redux-starter-kit'

// utils function. Not usable as a selector.
export const utils = {
  findEmployerDoc({ declarations, documentId }) {
    for (const declaration of declarations) {
      for (const employer of declaration.employers) {
        const employerDoc = employer.documents.find(
          ({ id }) => id === documentId,
        )
        if (employerDoc) return employerDoc
      }
    }
    return null
  },
  findEmployer({ declarations, employerId }) {
    for (const declaration of declarations) {
      const employer = declaration.employers.find(({ id }) => id === employerId)
      if (employer) return employer
    }
    return null
  },
  findDeclarationInfo({ declarations, infoId }) {
    for (const declaration of declarations) {
      const info = declaration.employers.find(({ id }) => id === infoId)
      if (info) return info
    }
    return null
  },
  getEmployerErrorKey(employerDocType) {
    return `${employerDocType}Error`
  },
  getEmployerLoadingKey(employerDocType) {
    return `${employerDocType}Loading`
  },
}

const selectDeclarations = (state) => state.declarationsReducer.declarations
const selectPreviewedEmployerDocId = (state) =>
  state.declarationsReducer.previewedEmployerFileId
const selectPreviewedInfoDocId = (state) =>
  state.declarationsReducer.previewedInfoFileId

export const selectPreviewedEmployerDoc = createSelector(
  [selectDeclarations, selectPreviewedEmployerDocId],
  (declarations, documentId) =>
    utils.findEmployerDoc({ declarations, documentId }),
)

export const selectPreviewedInfoDoc = createSelector(
  [selectDeclarations, selectPreviewedInfoDocId],
  (declarations, infoId) => utils.findDeclarationInfo({ declarations, infoId }),
)
