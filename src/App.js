import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [invites, setInvites] = useState([])

  const onClickInputValue = (e) => {
    setInputValue(e.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else {
      setInvites(prev => [...prev, id])
    }
  }

  useEffect(() => {
    fetch(' https://reqres.in/api/users')
    .then(response => response.json())
    .then(json => {
      setUsers(json.data)
    }).catch((error) => {
      console.warn(error);
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const onClickSendInvites = () => {
    setSuccess(true)
  }

  return (
    <div className="App">
      {
        success ? (
          <Success count={invites.length} />
        ) : <Users onClickSendInvites={onClickSendInvites} invites={invites} onClickInvite={onClickInvite} items={users} inputValue={inputValue} onClickInputValue={onClickInputValue} isLoading={isLoading} />
      }
    </div>
  );
}

export default App;
