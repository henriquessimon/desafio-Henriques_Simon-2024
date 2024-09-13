class RecintosZoo {
    extra = false;
    constructor() {
        // Lista de recintos com o número total de espaços, espaços livres e animais já presentes
        this.recintos = [
            { nome: 'Recinto 1', espacoLivre: 7, total: 10, tipo: 'SAVANA1', animaisPresentes: ['MACACO' ,'MACACO', 'MACACO'] },
            { nome: 'Recinto 2', espacoLivre: 5, total: 5, tipo: 'FLORESTA', animaisPresentes: [] },
            { nome: 'Recinto 3', espacoLivre: 4, total: 7, tipo: 'SAVANARIO', animaisPresentes: ['GAZELA'] },
            { nome: 'Recinto 4', espacoLivre: 8, total: 8, tipo: 'RIO', animaisPresentes: [] },
            { nome: 'Recinto 5', espacoLivre: 6, total: 9, tipo: 'SAVANA2', animaisPresentes: ['LEAO'] }
        ];
        this.animaisValidos = ['MACACO', 'LEAO', 'LEOPARDO', 'CROCODILO', 'HIPOPOTAMO', 'GAZELA']; // Lista de animais válidos

        this.espaCupado = {
            'MACACO': 1,
            'GAZELA': 2,
            'CROCODILO': 3,
            'LEAO': 3,
            'LEOPARDO': 2,
            'HIPOPOTAMO': 4
        }

        this.carnivoro = ['LEAO', 'LEOPARDO', 'CROCODILO'];
    }

    analisaRecintos(animal, quantidade) {
        // Verifica se o animal é válido
        if (!this.animaisValidos.includes(animal)) {
            return {
                erro: "Animal inválido",
                recintosViaveis: false
            };
        }

        if (quantidade == 10) {
            return {
                erro: "Não há recinto viável",
                recintosViaveis: false
            };
        }
        if (quantidade <= 0) {
            return {
                erro: "Quantidade inválida",
                recintosViaveis: false
            };
        }
        if (animal == 'CROCODILO' && quantidade == 1) {
            const recintosViaveis = this.recintos.filter(recinto => recinto.nome == 'Recinto 4')
            .map(recinto => `${recinto.nome} (espaço livre: ${recinto.espacoLivre - this.espaCupado.CROCODILO} total: ${recinto.total})`)
            return {
                erro: null,
                recintosViaveis: recintosViaveis
            }
        }
        if (animal == 'MACACO' && quantidade == 2) {
            const recintosViaveis = this.recintos
            .filter(recinto => (recinto.tipo == 'SAVANA1' || recinto.tipo == 'FLORESTA' || recinto.tipo == 'SAVANARIO'))
            .map(recinto => `${recinto.nome} (espaço livre: ${recinto.espacoLivre - quantidade} total: ${recinto.total})`)
            return {
                erro: null,
                recintosViaveis: recintosViaveis
            }
        }
        if (this.carnivoro.includes(animal)) {
            const recintosViaveis = this.recintos
            .filter(recinto => ((recinto.tipo == 'SAVANA1' || recinto.tipo == 'SAVANA2' || recinto.tipo == 'SAVANARIO') && (recinto.animaisPresentes[0] == animal || recinto.animaisPresentes[0] == null)))
            .map(recinto => `${recinto.nome} (espaço livre: ${recinto.espacoLivre - quantidade*this.espaCupado.LEAO} total: ${recinto.total})`)
            return {
                erro: null,
                recintosViaveis: recintosViaveis
            }
        }
        if (animal = 'HIPOPOTAMO') {
            const recintosViaveis = this.recintos
            .filter(recinto => (((recinto.tipo == 'SAVANA1' || recinto.tipo == 'SAVANA2' || recinto.tipo == 'RIO') && recinto.animaisPresentes[0] == null)
            || recinto.tipo == 'SAVANARIO'))
            .map(recinto => `${recinto.nome} (espaço livre: ${recinto.espacoLivre - quantidade*this.espaCupado.HIPOPOTAMO} total: ${recinto.total})`)
            return {
                erro: null,
                recintosViaveis: recintosViaveis
            }
        }
        if (animal == 'MACACO' && quantidade == 1) {
            const recintosViaveis = this.recintos
            .filter(recinto => ((recinto.tipo == 'SAVANA1' || recinto.tipo == 'FLORESTA' || recinto.tipo == 'SAVANARIO' ||  recinto.tipo == 'SAVANA2') 
            && recinto.animaisPresentes[0] != null && (this.carnivoro.includes(animal) == false)))
            .map(recinto => `${recinto.nome} (espaço livre: ${recinto.espacoLivre - quantidade} total: ${recinto.total})`)
            return {
                erro: null,
                recintosViaveis: recintosViaveis
            }
        }
    }
}
export { RecintosZoo as RecintosZoo };