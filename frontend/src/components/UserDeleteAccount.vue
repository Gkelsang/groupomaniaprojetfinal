<template>
  <div>
    <DeleteAccountButton @onDeleteAccount="confirmDeletion" />
  </div>
</template>

<script>
// Importations //
import { apiClient } from '../services/ApiClient'
import DeleteAccountButton from '../components/DeleteAccountButton'

// Exportation du module //
export default {
  name: 'UserDeleteAccount',
  components: {
    DeleteAccountButton
  },
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  methods: {
    async confirmDeletion () {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
        await apiClient.delete(`api/users/${this.userData.id}`)

        localStorage.clear()
        this.$router.push({
          path: '/login?deletedAccount=true'
        })
      }
    }
  }
}
</script>

<style lang="scss"></style>
