
function showTimeOut(obj) {
  setTimeout(() => {
    obj.value = false
  }, 3000)
}

export async function handleSubmit(payload) {
  const id = store.decodedToken().user_id
  isLoading.value = true
  const profileJson = JSON.stringify(payload)
  await fetch(`${import.meta.env.VITE_URL_API_UPDATE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: profileJson,
  }).then((response) => {
    if (response.ok == true && response.status == 204) {
      message.value = 'Perfil atualizado com sucesso!'
      showSuccess.value = true
      setTimeout(() => (showSuccess.value = false), 2000)
      isLoading.value = false
      return response
    }
  })
}