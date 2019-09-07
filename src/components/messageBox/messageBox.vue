<template>
    <div class="messageBox">
        <h2>{{title}}</h2>
        <p>{{content}}</p>
        <div>
            <div @touchstart="handleCancle">{{ cancle}}</div>
            <div @touchstart="handleOk">{{ok}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "messageBox"
    }
</script>

<style scoped>
    .messageBox {
        width: 200px;
        height: 120px;
        border-radius: 4px;
        box-shadow: 3px 3px 3px #ccc;
        border: 1px solid #ccc;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
    }

    .messageBox > h2 {
        text-align: center;
        line-height: 40px;
        font-size: 18px;
    }

    .messageBox > p {
        text-align: center;
        line-height: 40px;
    }

    .messageBox > div {
        display: flex;
        position: absolute;
        width: 100%;
        bottom: 0px;
        border-top: 1px solid #ccc;
    }

    .messageBox > div > div {
        flex: 1;
        text-align: center;
        line-height: 30px;
        border-right: 1px solid #ccc;
    }

    .messageBox > div > div:last-child {
        border: none;
    }
</style>