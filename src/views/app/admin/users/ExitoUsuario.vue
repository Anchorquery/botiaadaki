<template>
  <b-container>
	  <!-- <b-row>
      <b-col md="12">
        <div style="margin-bottom: 30px;">
          <b-nav tabs align="center">
            <b-nav-item :to="{ name: menu + '-' +'nuevo-pedido' }"
              >Nuevo pedido</b-nav-item
            >
            <b-nav-item :to="{ name: menu + '-' +'mis-pedidos' }"
              >Pedidos realizados</b-nav-item
            >
            <b-nav-item :to="{ name: menu + '-' +'pedidos-cancelados' }"
              >Pedidos cancelados
            </b-nav-item>
          </b-nav>
        </div>
      </b-col>
    </b-row> -->
    <b-row class="" v-if="isLoad">
      <b-col md="12">
							<b-img class="mb-4" center src="/assets/img/Front/check-original.png"></b-img>
        <h3 class="subtitle h4 text-center">
          ¡Enhorabuena!
        </h3>
								<p class=" h4 text-center">El nuevo usuario se ha agregado con exito. <br>
											Recibirá un correo con su contraseña y nombre de usuario.
								</p>
      </b-col>
            
    </b-row>
    <template v-else>
      <div class="loading"></div>
    </template>
  </b-container>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
	data(){
		return{
			isLoad:true
    }

  },
  computed: {
        ...mapGetters({menu : 'getMenuSidebar'}),
  }
}
</script>