<template>
	    <b-row class="" >
      <b-col md="12">
        <div style="margin-bottom: 30px;">
          <b-nav tabs align="center">
            <b-nav-item v-if="items" :to="{ name: 'NewIncidencia' }"
              >{{x}}</b-nav-item
            >
          </b-nav>
        </div>
      </b-col>
    </b-row>
</template>
<script>
export default {
	props:['items']
}
</script>