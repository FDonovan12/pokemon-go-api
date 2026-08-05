import { RawGameMaster } from '@generated/raw.index.js';
import { ClientQuestTemplate } from '../data/api/raw.type.js';
import { FileGenerator } from '../type/fileGenerator.js';

export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'weekly-quest.json';
    }

    async getFileContent(): Promise<any> {
        const raw: ClientQuestTemplate[] = await RawGameMaster.getClientQuestTemplate();
        const quests = raw
            .filter((quest) => quest.templateId.startsWith('WEEKLY_CHALLENGE'))
            .map((quest) => ({
                id: quest.data.quest.questId,
                achievement: { type: quest.data.quest.questType, goal: quest.data.quest.goal },
                reward: quest.data.quest.questRewards,
            }));
        return quests;
    }
}
