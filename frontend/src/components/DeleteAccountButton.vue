<template>
  <div>
    <div class="d-flex justify-content-center">
      <button class="delete-account d-flex justify-content-center align-items-center" aria-label="Supprimer le compte" >
        <p @click="onDeleteAccount" class="my-3 mr-1 mr-lg-2">
          Supprimer le compte
        </p>
        <b-icon icon="trash"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
// Exportations //
import { apiClient } from '../services/ApiClient'
import { mapActions } from 'vuex'

// Importation du module //
export default {
  name: 'DeleteAccountButton',
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  methods: {
    async onDeleteAccount () {
      this.$emit('onDeleteAccount')
    }
  }
}
</script>

<style lang="scss">
.delete-account {
  color: #d1515a;
  font-size: 14px;
  border-radius: 0.25rem;
  background-color: transparent;
  border: none;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: none;
  }
}
</style>
