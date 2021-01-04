<template> 
    <div class="ShareWidget">
        <div class="row">
            <div class="column">
                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" data-show-count="false">
                    <div class="twitter">
                        <i class="fab fa-twitter fa-2x"></i>
                    </div>
                </a>
                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>

            <div class="column">
                <a href="https://www.facebook.com/sharer/sharer.php?u=https://panda.baybrigades.org/" target="_blank">
                    <div class="facebook">
                        <i class="fab fa-facebook-f fa-2x"></i>
                    </div>
                </a>    
            </div>

            <div class="column">
                <a href="http://www.reddit.com/submit?url=https://panda.baybrigades.org/">
                    <div class="reddit">
                        <i class="fab fa-reddit-alien fa-2x"></i>
                    </div>
                </a>    
            </div>

            <div class="column">
                <a href="http://www.linkedin.com/shareArticle?mini=true&url=https://panda.baybrigades.org/">
                    <div class="linkedin">
                        <i class="fab fa-linkedin-in fa-2x"></i>
                    </div>
                </a>
            </div>

            <div class="column">
                <div class="email" v-on:click="share">
                    <i class="fas fa-share-alt fa-2x"></i>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
export default {
    name: 'ShareWidget',
    methods: {
        share: function(event) {
            if (navigator.share) {
                navigator.share({
                    title: 'Bay Area Pandemic Dashboard',
                    url: 'https://panda.baybrigades.org/'
                }).then(() => {
                    console.log('Thanks for sharing!');
                })
                .catch(console.error);
            } else {
                //Fallback...
            }
        }
    } 
}
</script>

<style>
.ShareWidget {
    margin: auto;
    width: 100%;
    position:fixed;
    bottom:0px;
    margin-bottom:0px;
    z-index: 100;

}
.row {
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* height: 45px; */
    
}

.column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    text-align: center;
    color: white;
    
}
a {
    height: 100%;
}
.twitter {
    
    padding: 10% 0;
    color: white;
    background-color: #56ACEE;
    height: 100%
}
.facebook {
    padding: 10% 0;
    color: white;
    background-color: #3B5998;
    height: 100%
}
.reddit {
    padding: 10% 0;
    color: white;
    background-color: #FF3F19;
    height: 100%
}
.linkedin {
    padding: 10% 0;
    color: white;
    background-color: #007AB5;
    height: 100%;
}
.email {
    padding: 10% 0;
    color: white;
    background-color: #473A8C;
    height: 100%;
}
</style>