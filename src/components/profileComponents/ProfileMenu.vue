<template>
    <div>
        <div class="menu">
            <p class="menuHeading">Profile</p>
            <ul>
                <li :class="[currentPage.includes('profile/aboutme') ? activeLink : '']"><a>About Me</a></li>
                <li :class="[currentPage.includes('profile/favorites') ? activeLink : '']"><a>Favorites</a></li>
            </ul>
        </div><br>
        <div class="menu">
            <p class="menuHeading">Settings</p>
            <ul>
                <li :class="[currentPage.includes('settings/general') ? activeLink : '']"><a>General</a></li>
                <li :class="[currentPage.includes('settings/security') ? activeLink : '']"><a>Security</a></li>
                <li :class="[currentPage.includes('settings/privacy') ? activeLink : '']"><a>Privacy</a></li>
                <li :class="[currentPage.includes('settings/notifications') ? activeLink : '']"><a>Notifications</a></li>
                <li :class="[currentPage.includes('settings/invite-friends') ? activeLink : '']"><a>Invite Friends</a></li>
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

.menu {
    border-left: 1px solid black;
    padding-left: 10%;
}

.activeLink {
    border-bottom: 2px solid #bb4584;
}

.menu a:hover{
    border-bottom: 2px solid #bb4584;
}

</style>