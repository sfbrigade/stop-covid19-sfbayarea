<template> 
    <div class="ShareWidget">
        <div class="row">
            <div class="column">
                <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" data-show-count="false">
                    <div class="twitter widge">
                        <i class="fab fa-twitter fa-2x"></i>
                    </div>
                </a>
                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>

            <div class="column">
                <a href="https://www.facebook.com/sharer/sharer.php?u=https://panda.baybrigades.org/" target="_blank">
                    <div class="facebook widge">
                        <i class="fab fa-facebook-f fa-2x"></i>
                    </div>
                </a>    
            </div>

            <div class="column">
                <a href="http://www.reddit.com/submit?url=https://panda.baybrigades.org/">
                    <div class="reddit widge">
                        <i class="fab fa-reddit-alien fa-2x"></i>
                    </div>
                </a>    
            </div>

            <div class="column">
                <a href="http://www.linkedin.com/shareArticle?mini=true&url=https://panda.baybrigades.org/">
                    <div class="linkedin widge">
                        <i class="fab fa-linkedin-in fa-2x"></i>
                    </div>
                </a>
            </div>

            <div class="column">
                <div class="email widge" v-on:click="share">
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

<style lang="css" scoped>
.ShareWidget {
    width: 100%;
    position: fixed;
    bottom: 0px;
    z-index: 100;
}
.row {
    margin: auto;
    display: flex;
    flex-direction: row;
}
.column {
    display: flex;
    flex-direction: column;
    flex: 1;  
}
a {
    text-decoration: none;
    font-size: 0.9rem;
}
.widge {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 45px;
    color: white;
}
.twitter {
    background-color: #56ACEE;
}
.facebook {
    background-color: #3B5998;
}
.reddit {
    background-color: #FF3F19; 
}
.linkedin {
    background-color: #007AB5;  
}
.email {
    background-color: #473A8C; 
}
</style>