<script setup lang="ts">
const checkbox = ref<string[]>([]);
const range = ref(0);
</script>
<template>
  <AppContainer>
    <AppRoundedBorder>
      <AppH2>checkbox</AppH2>
      <FormKit
        v-model="checkbox"
        type="checkbox"
        label="Toppings"
        :options="['Mushrooms', 'Olives', 'Salami', 'Anchovies']"
        help="Select your pizza toppings"
        validation="required|min:3"
      />
      <AppPre>{{ checkbox }}</AppPre>
    </AppRoundedBorder>
    <AppRoundedBorder>
      <AppH2>select</AppH2>
      <FormKit
        type="select"
        label="Which country is the smallest?"
        name="small_country"
        :options="[
          'Monaco',
          'Vatican City',
          'Maldives',
          'Tuvalu',
        ]"
      />
    </AppRoundedBorder>
    <AppRoundedBorder>
      <AppH2>telephone</AppH2>
      <FormKit
        type="tel"
        label="Phone number"
        placeholder="xxx-xxxx-xxxx"
        validation="matches:/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/"
        :validation-messages="{
          matches: 'Phone number must be in the format xxx-xxxx-xxxx',
        }"
        validation-visibility="dirty"
      />
    </AppRoundedBorder>
    <AppRoundedBorder>
      <AppH2>text</AppH2>
      <FormKit
        type="text"
        label="Your username"
        value="calypso"
        help="Pick a username people will remember!"
      />
    </AppRoundedBorder>
    <AppRoundedBorder>
      <AppH2>textarea</AppH2>
      <FormKit
        type="textarea"
        label="Your Essay"
        rows="10"
        placeholder="Remember to write in complete sentences."
        help="I'll know if you didn't read the book!"
      />
    </AppRoundedBorder>
    <AppRoundedBorder>
      <AppH2>range</AppH2>
      <FormKit
        v-model="range"
        type="range"
        label="Volume"
        min="0"
        max="11"
        help="Select your volume level."
      />
      <AppPre>{{ range }}</AppPre>
    </AppRoundedBorder>
  </AppContainer>
</template>
