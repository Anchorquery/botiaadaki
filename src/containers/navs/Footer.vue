<template>
<footer class="page-footer">
    <div class="footer-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-sm-6">
                    <p class="mb-0 text-muted">Eoss</p>
                </div>

            </div>
        </div>
    </div>
</footer>
</template>
<script>
import { mapGetters } from "vuex";
export default {

      computed: {
    ...mapGetters({
      currentUser: "currentUser"
    })
  }

}

</script>
