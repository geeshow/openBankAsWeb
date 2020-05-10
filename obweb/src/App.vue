<template>
  <v-app id="inspire">


    <v-app-bar
            app
            color="cyan"
            dark
    >
      <v-spacer></v-spacer>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-content>
      <v-container
              class="fill-height"
              fluid
      >
        <v-row
                align="center"
                justify="center"
        >
          <v-col class="text-center">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn
                        :href="source"
                        icon
                        large
                        target="_blank"
                        v-on="on"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>

              <span>Source</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer
            color="cyan"
            app
    >
      <v-spacer></v-spacer>

      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
export default {
  name: 'LayoutsDemosBaselineFlipped',
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
}
</script>