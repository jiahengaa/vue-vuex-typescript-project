<template>
  <div class="app">
    <h2 class="companyName">Company Name</h2>
    <nav class="mainNav clearfix">
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#work" class="smoothScroll">Work</a>
        </li>
        <li>
          <a href="#about" class="smoothScroll">About</a>
        </li>
        <li>
          <a href="#contact" class="smoothScroll">Contact</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component({
  name: 'beautifulPage'
})
export default class BeautifulPage extends Vue {}
</script>


<style lang="scss" scoped>
.app {
  background-size: cover;
  background-attachment: fixed;
  background: url(https://ununsplash.imgix.net/uploads/141319062591093cefc09/ad50c1f0?q=75&fm=jpg&s=a356dd61ff3da2269124bcd12a303b7e);
  max-width: 920px;
  margin: 0 auto;
  h2 {
    font-size: 3rem;
    text-align: center;
    padding-top: 100px;
    margin: 0 0 30px 0;
  }
  .companyName {
    padding: 18px 0px 18px 0;
    margin: 0;
    float: left;
    color: #fff;
    width: 45%;
    background-color: rgba(0, 0, 0, 0.7);
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 400;
    font-size: 1.8rem;
    text-align: left;
    font-variant: small-caps;
  }
  nav {
    padding: 0;
    margin: 0;
    width: 55%;
    float: right;

    ul {
      float: right;
      display: inline-block;
      padding: 0;
      margin: 0;
      width: 100%;
      border-right: 20px solid rgba(0, 0, 0, 0.7);

      li {
        float: left;
        margin: 0;
        display: inline;
        width: 25%;
        text-align: center;
        background: rgba(0, 0, 0, 0.7);

        &:hover {
          background: none;
          font-style: bold;
          transform: scale(1.2);
        }

        a {
          text-decoration: none;
          padding: 25px 20px;
          color: #fff;
          margin: 0;
          display: inline-block;
          text-transform: uppercase;
          font-family: 'Quicksand', sans-serif;
          font-size: 1rem;
          padding: 25px 2%;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>

