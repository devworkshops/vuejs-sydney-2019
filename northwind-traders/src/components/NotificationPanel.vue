<template>
    <div>
        <div class="clearfix">
            <h4 class="float-left pt-1">Notifications</h4>
            <b-button variant="link" v-b-toggle.collapseNotifications class="float-right">
                &times;
            </b-button>
        </div>

        <p v-if="notifications.length === 0">No notifications for this session.</p>

        <b-alert show dismissible
            v-for="notification in notifications"
            :key="notification.id"
            :variant="notification.context"
            @dismissed="dismissNotification(notification.id)">
            <strong>{{ notification.context === 'success' ? 'Success' : 'Error' }}</strong>
            <br>
            {{ notification.message }}
        </b-alert>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState(['notifications']),
    methods: {
        dismissNotification(id) {
            this.$store.commit('dismissNotification', id)
        }
    }
}
</script>