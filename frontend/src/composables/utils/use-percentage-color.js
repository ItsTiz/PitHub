import { computed, toValue } from 'vue'

const useGaugeColor = (sourceValue, thresholds = [50, 75, 95]) => {
    return computed(() => {
        const val = toValue(sourceValue);

        if (val < thresholds[0]) return 'info';
        if (val < thresholds[1]) return 'success';
        if (val < thresholds[2]) return 'orange';
        return 'primary';
    });
}

const usePercentage = (min, max, input) => {
    return computed(() => {
        const minValue = toValue(min);
        const maxValue = toValue(max);
        const inputValue = toValue(input);

        if (maxValue === minValue) return 0;
        const percent = (((inputValue - minValue) / (maxValue - minValue)) * 100).toFixed(1);
        return Math.min(Math.max(percent, 0), 100)
    })
}

export { useGaugeColor, usePercentage }