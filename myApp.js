var myApp = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        infos:[],
    },
    mounted: function () {
        this.infos.push( 
            {titulo:'todos os jogos',valor:30,cor:'blue',icon:"horizontal_split"},
            {titulo:'jogos para 2',valor:10,cor:'green',icon:"horizontal_split"},
            {titulo:'jogos para 2',valor:10,cor:'green',icon:"horizontal_split"},
            {titulo:'jogos para 2',valor:10,cor:'green',icon:"horizontal_split"},
            {titulo:'jogos para 2',valor:10,cor:'green',icon:"horizontal_split"},
            {titulo:'jogos para 2',valor:10,cor:'green',icon:"horizontal_split"},
            {titulo:'jogos com editora',valor:3,cor:'orange',icon:"horizontal_split"},
            );
      },
    methods: {
        getBoardgames:function(){

        }
    },
  });

