/* eslint-disable no-alert */
/* eslint-disable no-confirm */

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import React, { useEffect, useState } from 'react'
import superagent from 'superagent'

import UsersTable from '../components/UsersTable'

export const UsersList = () => {
  const [users, setUsers] = useState([])
  const [showAuthorizedUsers, toggleAuthorizedUsers] = useState(false)
  const [selectedUsersIds, setSelectedUsersIds] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchUsers = () =>
    superagent
      .get(
        `/zen-admin-api/users?authorized=${
          showAuthorizedUsers ? 'true' : 'false'
        }`,
      )
      .then(({ body }) => {
        setUsers(body)
      })

  const authorizeUsers = () => {
    const selectedUsersNames = selectedUsersIds
      .map((id) => {
        const user = users.find((u) => u.id === id)
        return `${user.firstName} ${user.lastName}`
      })
      .join(', ')
    if (
      !window.confirm(`Autoriser ces utilisateurs (${selectedUsersNames}) ?`)
    ) {
      return
    }

    setError(null)
    setLoading(true)

    superagent
      .post(`/zen-admin-api/users/authorize`, { ids: selectedUsersIds })
      .then(({ body: { updatedRowsNb } }) =>
        window.alert(`${updatedRowsNb} utilisateurs ont été validés.`),
      )
      .then(fetchUsers)
      .catch(setError)
      .then(() => setLoading(false))
  }

  useEffect(() => {
    fetchUsers()
  }, [showAuthorizedUsers])

  if (users.length === 0) return null

  return (
    <div style={{ textAlign: 'center' }}>
      {error && (
        <div>
          Il y a eu une erreur pendant l'autorisation des utilisateurs.
          Réessayer devrait résoudre le problème. Dans le cas contraire,
          contacter le développeur.
        </div>
      )}
      {loading && <div>Chargement…</div>}
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={showAuthorizedUsers}
              onChange={() => toggleAuthorizedUsers(!showAuthorizedUsers)}
            />
          }
          label={`Utilisateurs ${showAuthorizedUsers ? '' : ' non '} autorisés`}
        />
        <br />
        <Button
          href={`/zen-admin-api/users?csv&authorized=${
            showAuthorizedUsers ? 'true' : 'false'
          }`}
          variant="contained"
          color="primary"
        >
          Télécharger un extract des utilisateurs{' '}
          {showAuthorizedUsers ? '' : 'non'} autorisés
        </Button>
        <br />
        <UsersTable
          allowSelection={!showAuthorizedUsers}
          users={users}
          selectedUsersIds={selectedUsersIds}
          setSelectedUsersIds={setSelectedUsersIds}
        />
      </div>
    </div>
  )
}

UsersList.propTypes = {}

export default UsersList
