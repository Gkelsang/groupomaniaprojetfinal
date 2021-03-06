// Importations //
import router from '../router/index'

// Fixe l'adresse du localhost //
class ApiClient {
  constructor () {
    this.baseUrl = 'http://localhost:3000/'
  }

  // Définie le header des requettes //
  headers (options = {}) {
    const contentType = options.isFormData
      ? {}
      : {
          'Content-Type': 'application/json'
        }
    return {
      ...contentType,
      Authorization: 'Bearer ' + localStorage.getItem('userToken')
    }
  }

  // Définition des requetes get //
  get (path) {
    return fetch(this.baseUrl + path, {
      headers: this.headers()
    })
      .then(response => {
        if (response.status === 401) {
          localStorage.clear()
          router.push({ name: 'Login' })
        }
        return response.json()
      })
      .catch(() => alert("Impossible de récupérer les données de l'API"))
  }

  // Définition des requetes post //
  post (path, body, options = {}) {
    return fetch(this.baseUrl + path, {
      method: 'POST',
      body: options.isFormData ? body : JSON.stringify(body),
      headers: this.headers(options)
    }).then(response => this.handleResponse(response))
  }
  
  // Définition des requetes delete //
  delete (path) {
    return fetch(this.baseUrl + path, {
      method: 'DELETE',
      headers: this.headers()
    }).then(response => this.handleResponse(response))
  }

  // Définition des requetes put //
  put (path, body, options = {}) {
    return fetch(this.baseUrl + path, {
      method: 'PUT',
      body: options.isFormData ? body : JSON.stringify(body),
      headers: this.headers(options)
    }).then(response => this.handleResponse(response))
  }

  async handleResponse (response) {
    if (!response.status.toString().match(/20[01]/)) throw await response.json()
    return response.json()
  }
}

// Exportation du module //
export const apiClient = new ApiClient()