<template>
    <div class="vtp-loading" :class="isLight ? 'light':'dark'">
        <div class="vtp-loader vtp-square vtp-switch">
            <div class="vtp-block">
                <div class="vtp-box" />
            </div>
        </div>
  </div>
</template>

<script>
//generic loader
export default {
    name:'loading',
    data: ()=>({ isLight: true }),
    mounted(){
        if(this.$el.attributes.getNamedItem('dark'))
            this.isLight = false;
    }
}

</script>


<style lang="scss" scoped>

$s: 20px; //size
$m: 2px; //margin
$d: 1s; //speed
//colors

$light: #eee;
$dark: #333;

@mixin color-shade($color){
    .vtp-block{
        color: $color;
        &:before, &:after{
            background: $color;
        }
        .vtp-box{
            background: $color;
        }
    }
} 

.vtp-loading{
	position: relative;
	width: $s*5;
	height: $s*5;
	flex-shrink: 1;
	flex-grow: 1;
    &.light{
        @include color-shade($light);
    }
    &.dark{
        @include color-shade($dark);
    }
    .vtp-loader{
        position: absolute;
        top: 50%;
        left: 50%;
        &.vtp-square{
            .vtp-block{
                border-radius: $m*2;
                width: 2*$s + $m*5;
                height: 2*$s + $m*5;
                &:before, &:after{
                    bottom: $m;
                }
                &:before{
                    left: $m;
                }
                &:after{
                    right: $m;
                }
                .vtp-box{
                    left: $m;
                    top: $m;
                    animation-name: slide;
                }
            }
        }
        &.vtp-switch{
            .vtp-block{
                animation-name: switch;
                animation-duration: $d*2;
                animation-timing-function: steps(4);
                .vtp-box{
                    animation-duration: $d*.5;
                }
            }
        }
    }
    .vtp-block{
        position: absolute;
        border: $m solid transparent;
        transform: translate(-50%, -50%) rotate(-45deg);
        animation-timing-function: ease-in-out;
        animation-duration: $d;
        animation-iteration-count: infinite;
        &:before, &:after{
            content: "";
            position: absolute;
            width: $s;
            height: $s;
            border-radius: $m*2;
        }
        &:before{
            left: $m;
        }
        &:after{
            right: $m;
        }
    }
    .vtp-box{
        position: absolute;
        width: $s;
        height: $s;
        border-radius: $m*2;
        animation-timing-function: ease-in-out;
        animation-duration: $d;
        animation-iteration-count: infinite;
    }
}


@keyframes slide{
	33%{
		left: $m;
	}
	67%,100%{
		left: $m*2 + $s;
	}
}
@keyframes switch{
	to{
		transform: translate(-50%, -50%) rotate(-405deg);
	}
}

</style>