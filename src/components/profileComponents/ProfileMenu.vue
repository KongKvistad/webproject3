<!--
    @desc The menu on the left side in profile layout to navigate the profile and settings in there
-->

<template>
    <div>
        <div class="menu">
            <p class="menuHeading">Profile</p>
            <ul>
                <li :class="[currentPage.includes('profile/aboutme') ? activeLink : '']"><router-link to="/profile/aboutme">About Me</router-link></li>
                <li :class="[currentPage.includes('profile/favorites') ? activeLink : '']"><a>Favorites</a></li>
            </ul>
        </div><br>
        <div class="menu">
            <p class="menuHeading">Settings</p>
            <ul>
                <li :class="[currentPage.includes('profile/settings/general') ? activeLink : '']"><router-link to="/profile/settings/general">General</router-link></li>
                <li :class="[currentPage.includes('profile/settings/security') ? activeLink : '']"><a>Security</a></li>
                <li :class="[currentPage.includes('profile/settings/privacy') ? activeLink : '']"><a>Privacy</a></li>
                <li :class="[currentPage.includes('profile/settings/notifications') ? activeLink : '']"><a>Notifications</a></li>
                <li :class="[currentPage.includes('profile/settings/invite-friends') ? activeLink : '']"><a>Invite Friends</a></li>
            </ul>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileMenu',
    data() {
        return{
            activeLink: 'activeLink'
        }
    },

    computed: {
        currentPage() {
            return this.$route.path
        }
    }

}
</script>

<style scoped>
.menuHeading{
    font-size: 1.2em;
    font-weight: bold;
}

.activeLink {
    border-bottom: 2px solid #a33e74bb;
    color: #a33e74bb;
}

.menu a:hover{
    color: #a33e74bb;
}

</style>