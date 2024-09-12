import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NODEMAILER_USER: string;
  NODEMAILER_PASS: string;
  NODEMAILER_HOST: string;
  NODEMAILER_PORT: number;
  NODEMAILER_ADDRESS: string;
  JWT_SEED: string;
  API_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NODEMAILER_USER: joi.string().required(),
    NODEMAILER_PASS: joi.string().required(),
    NODEMAILER_HOST: joi.string().required(),
    NODEMAILER_ADDRESS: joi.string().required(),
    NODEMAILER_PORT: joi.number().required(),
    JWT_SEED: joi.string().required(),
    API_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  m_user: envVars.NODEMAILER_USER,
  m_pass: envVars.NODEMAILER_PASS,
  m_host: envVars.NODEMAILER_HOST,
  m_port: envVars.NODEMAILER_PORT,
  m_address: envVars.NODEMAILER_ADDRESS,
  jwt_seed: envVars.JWT_SEED,
  api_url: envVars.API_URL,
};
