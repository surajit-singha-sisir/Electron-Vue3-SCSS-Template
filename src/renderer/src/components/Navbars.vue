<template>
    <section class="w-100">
        <div class="text-nowrap text-s f-center gap-05 h-100">
            <div class="onuman-icon">
                <img src="../assets/images/Onuman-logo.svg" alt="Onuman Logo" />
            </div>
            <div class="vr"></div>
            <!-- NAV LIST -->
            <nav class="nav-list">
                <!-- NAV -->
                <div v-for="nav in navItems" :key="nav.name" class="a-nav" @mouseenter="handleMouseEnter(nav.name)"
                    @click="toggleSubNav(nav.name)">
                    <p id="nav-name">{{ nav.name }}</p>
                    <ul class="sub-navs" v-show="activeNav === nav.name">
                        <li v-for="subNav in nav.subNavs" :key="subNav.name" class="sub-nav">
                            <p @click="handleSubNavClick(subNav.action)">{{ subNav.name }}</p>
                            <p class="shot-cut-nav">{{ subNav.shortcut }}</p>
                        </li>
                    </ul>
                </div>
                
                <!-- SEARCH BAR -->
                <div class="onuman-search">
                    <div class="onuman-input-box">
                        <input type="search" id="search" name="search" class="onuman-input2"
                            placeholder="Search... (Ctrl + Shift + Tab)" maxlength="200" aria-labelledby="search-label"
                            v-model="searchQuery" @input="handleSearch" />
                    </div>
                    <div class="search-result" v-show="showSearchResults">
                        <div class="inner-search-result">
                            <div class="search-loader" v-if="isSearching"></div>
                            <ul v-else>
                                <li v-for="result in searchResults" :key="result">{{ result }}</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </nav>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface SubNav {
    name: string;
    shortcut: string;
    action: () => void;
}

interface NavItem {
    name: string;
    subNavs: SubNav[];
}

const navItems = ref<NavItem[]>([
    {
        name: 'Project',
        subNavs: [
            { name: 'New Project', shortcut: 'Ctrl + N', action: () => console.log('New Project') },
        ],
    },
    {
        name: 'Materials',
        subNavs: [
            { name: 'Current Materials', shortcut: 'Ctrl + M', action: () => console.log('Current Materials') },
            { name: 'All Materials', shortcut: 'Ctrl + Shift + M', action: () => console.log('All Materials') },
        ],
    },
    {
        name: 'Analyzer',
        subNavs: [
            { name: 'New Analyzer', shortcut: 'Ctrl + Alt + N', action: () => console.log('New Analyzer') },
        ],
    },
    {
        name: 'Reports',
        subNavs: [
            { name: 'New Reports', shortcut: 'Ctrl + R', action: () => console.log('New Reports') },
        ],
    },
    {
        name: 'FTP',
        subNavs: [
            { name: 'New FTP', shortcut: 'Ctrl + F', action: () => console.log('New FTP') },
        ],
    },
    {
        name: 'Chat',
        subNavs: [
            { name: 'New Chat', shortcut: 'Ctrl + T', action: () => console.log('New Chat') },
        ],
    },
    {
        name: 'Help',
        subNavs: [
            { name: 'New Help', shortcut: 'Ctrl + H', action: () => console.log('New Help') },
        ],
    },
]);

const activeNav = ref<string | null>(null);
const isHoverEnabled = ref(false);

const toggleSubNav = (navName: string) => {
    activeNav.value = activeNav.value === navName ? null : navName;
    isHoverEnabled.value = true;
};

const handleMouseEnter = (navName: string) => {
    if (isHoverEnabled.value) {
        activeNav.value = navName;
    }
};

const handleSubNavClick = (action: () => void) => {
    action();
    isHoverEnabled.value = true;
};

const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.a-nav')) {
        activeNav.value = null;
        isHoverEnabled.value = false;
    }
};

const searchQuery = ref('');
const searchResults = ref<string[]>([]);
const isSearching = ref(false);
const showSearchResults = ref(false);

const handleSearch = async () => {
    if (searchQuery.value.trim() === '') {
        showSearchResults.value = false;
        searchResults.value = [];
        return;
    }

    isSearching.value = true;
    showSearchResults.value = true;

    setTimeout(() => {
        searchResults.value = [
            `Results for "${searchQuery.value}"`
        ];
        isSearching.value = false;
    }, 1000);
};

// Keyboard shortcuts
const handleKeydown = (event: KeyboardEvent) => {
    const ctrl = event.ctrlKey;
    const shift = event.shiftKey;
    const alt = event.altKey;
    const key = event.key.toLowerCase();

    if (ctrl && !shift && !alt && key === 'n') {
        console.log('Ctrl + N: New Project');
        navItems.value.find(nav => nav.name === 'Project')?.subNavs[0].action();
    } else if (ctrl && !shift && !alt && key === 'm') {
        console.log('Ctrl + M: Current Materials');
        navItems.value.find(nav => nav.name === 'Materials')?.subNavs[0].action();
    } else if (ctrl && shift && !alt && key === 'm') {
        console.log('Ctrl + Shift + M: All Materials');
        navItems.value.find(nav => nav.name === 'Materials')?.subNavs[1].action();
    } else if (ctrl && !shift && alt && key === 'n') {
        console.log('Ctrl + Alt + N: New Analyzer');
        navItems.value.find(nav => nav.name === 'Analyzer')?.subNavs[0].action();
    } else if (ctrl && !shift && !alt && key === 'r') {
        console.log('Ctrl + R: New Reports');
        navItems.value.find(nav => nav.name === 'Reports')?.subNavs[0].action();
    } else if (ctrl && !shift && !alt && key === 'f') {
        console.log('Ctrl + F: New FTP');
        navItems.value.find(nav => nav.name === 'FTP')?.subNavs[0].action();
    } else if (ctrl && !shift && !alt && key === 't') {
        console.log('Ctrl + T: New Chat');
        navItems.value.find(nav => nav.name === 'Chat')?.subNavs[0].action();
    } else if (ctrl && !shift && !alt && key === 'h') {
        console.log('Ctrl + H: New Help');
        navItems.value.find(nav => nav.name === 'Help')?.subNavs[0].action();
    } else if (ctrl && shift && !alt && key === 'tab') {
        console.log('Ctrl + Shift + Tab: Focus Search');
        const searchInput = document.getElementById('search') as HTMLInputElement;
        searchInput?.focus();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped>
.onuman-input-box:first-child {
    padding-top: 0 !important;
}

.onuman-input-box:last-child {
    padding-bottom: 0 !important;
}

.onuman-input-box {
    padding: 0;
}

</style>