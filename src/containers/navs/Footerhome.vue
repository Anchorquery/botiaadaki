<template>
  <footer class="footer-1" style="padding: 2em 0;">
    <div class="custom-footer container">
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <ul class="ul-navs">
            <li>
              <router-link tag="a" to="/nosotros"> Nosotros </router-link>
            </li>
            <li>
              <a
                href="http://www.pedido.compagniedesdesserts.com/content/6-contact"
              >
                Contacto
              </a>
            </li>
            <li>
              <router-link tag="a" to="/preguntas-frecuentes">
                FAQ
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <ul class="ul-navs">
            <li>
              <router-link tag="a" to="/"> Solicitar acceso </router-link>
            </li>
            <li>
              <router-link tag="a" to="/"> Política de Cookies </router-link>
            </li>
            <li>
              <router-link tag="a" to="/terminos-y-condiciones">
                Términos y condiciones
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <p>Síguenos en:</p>

          <ul class="redes-sociales">
            <li>
              <a href="#" target="blank"
                ><img src="/assets/img/TuMenu/facepink.png"
              /></a>
            </li>
            <li>
              <a href="#" target="blank"
                ><img src="/assets/img/TuMenu/instapink.png"
              /></a>
            </li>
            <li>
              <a href="#" target="blank"
                ><img src="/assets/img/TuMenu/linkedinpink.png"
              /></a>
            </li>
          </ul>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12 div-contacto">
          <ul class="contacto">
            <li>
              <a href="tel:+34936547272" target="blank"
                ><img src="/assets/img/TuMenu/phone.png" />
                <span style="margin-left:10px">+ 34 93 654 72 72</span></a
              >
            </li>
            <li>
              <a
                href="https://www.google.com/maps/dir/10.2713585,-67.9117966/Pol.+Cami+Ral,+C%2FMolinot+43+08860+CASTELLDEFELS/@20.834643,-70.9564254,3z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x12a482b40b325ad1:0x862d35b1db4869f9!2m2!1d1.9844708!2d41.2790744"
                target="blank"
                ><img src="/assets/img/TuMenu/location.png" /><span
                  style="margin-left:10px"
                  >Pol. Cami Ral, C/Molinot 43 08860 CASTELLDEFELS</span
                ></a
              >
            </li>
          </ul>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12 ">
          <div class="adsolute-footer">
            <span class="p-absolute">© 2014 - My Compagnie Des Desserts</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
