<template>
    <div>
        我的
    </div>

</template>
<script>
    export default {
        created() {
            this.getCityInfo()

        },
        methods: {
            async getCityInfo() {
                const ret = await  this.$axios.get('/api/cityList')
                let cities = ret.data.data.cities
                let cityList = []
                let hotList=[]
                let flag
                let letter
                cities.forEach(city => {
                    flag = false
                    letter = city.py.slice(0, 1).toUpperCase()
                    cityList.some(item => {
                        if (item.letter == letter) {
                            item.list.push(city)
                            flag = true
                            return true
                        }
                    })
                    if (!flag) {
                        cityList.push({letter, list: [city]})
                    }
                    if(city.isHot){
                        hotList.push(city)
                    }
                })
                cityList.sort((c1, c2) => {
                    return c1.letter.charCodeAt() - c2.letter.charCodeAt()
                })
                console.log(cityList);
                console.log(hotList);

            }

        }
    }
</script>
<style lang='less' type='text/less' scoped>

</style>