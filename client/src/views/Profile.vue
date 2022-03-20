<template>
    <center>
        <div>
            <h1>This is The Profile Page of {{ $route.params.username }}</h1>
            <button @click="$router.push('/')">Back</button>
        </div>
    </center>
</template>

